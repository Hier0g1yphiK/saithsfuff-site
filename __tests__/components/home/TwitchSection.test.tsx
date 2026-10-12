import { render, screen, act } from "@testing-library/react";
import TwitchSection from "@/components/home/TwitchSection";

// Capture the props passed to next/script so we can trigger callbacks
let scriptProps: Record<string, unknown> = {};

jest.mock("next/script", () => {
  return function MockScript(props: Record<string, unknown>) {
    scriptProps = props;
    return <script data-testid="mock-script" src={props.src as string} />;
  };
});

// Mock Twitch global
const mockAddEventListener = jest.fn();
const mockEmbed = jest.fn().mockImplementation(() => ({
  addEventListener: mockAddEventListener,
  getPlayer: jest.fn(),
}));

beforeEach(() => {
  scriptProps = {};
  mockEmbed.mockClear();
  mockAddEventListener.mockClear();
  (global as unknown as Record<string, unknown>).Twitch = {
    Embed: Object.assign(mockEmbed, {
      VIDEO_READY: "video.ready",
      VIDEO_PLAY: "video.play",
    }),
  };
});

afterEach(() => {
  delete (global as unknown as Record<string, unknown>).Twitch;
});

describe("TwitchSection", () => {
  describe("heading", () => {
    it('renders heading with "Watch on Twitch" text', () => {
      render(<TwitchSection />);
      expect(screen.getByText("Watch on Twitch")).toBeInTheDocument();
    });

    it("applies gradient-text class to heading text", () => {
      render(<TwitchSection />);
      const headingSpan = screen.getByText("Watch on Twitch");
      expect(headingSpan).toHaveClass("gradient-text");
    });

    it("applies responsive size classes to the heading element", () => {
      render(<TwitchSection />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-2xl");
      expect(heading).toHaveClass("sm:text-3xl");
    });
  });

  describe("section container", () => {
    it("has section-container class", () => {
      render(<TwitchSection />);
      const section = screen
        .getByRole("heading", { level: 2 })
        .closest("section");
      expect(section).toHaveClass("section-container");
    });
  });

  describe("whimsical-card wrapper", () => {
    it("renders whimsical-card with responsive padding classes", () => {
      render(<TwitchSection />);
      const section = screen
        .getByRole("heading", { level: 2 })
        .closest("section")!;
      const card = section.querySelector(".whimsical-card");
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass("p-4");
      expect(card).toHaveClass("sm:p-6");
    });
  });

  describe("embed container", () => {
    it("renders embed container with 16:9 aspect ratio styling", () => {
      render(<TwitchSection />);
      const embedDiv = document.getElementById("twitch-embed");
      expect(embedDiv).toBeInTheDocument();
      expect(embedDiv).toHaveClass("aspect-video");
      expect(embedDiv).toHaveClass("w-full");
    });
  });

  describe("channel link", () => {
    it("has correct href, target, and rel attributes", () => {
      render(<TwitchSection />);
      const links = screen.getAllByRole("link");
      const channelLink = links.find(
        (link) =>
          link.getAttribute("href") === "https://www.twitch.tv/saithsfuff"
      );
      expect(channelLink).toBeInTheDocument();
      expect(channelLink).toHaveAttribute("target", "_blank");
      expect(channelLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has pink-500 text styling", () => {
      render(<TwitchSection />);
      const links = screen.getAllByRole("link");
      const channelLink = links.find(
        (link) =>
          link.getAttribute("href") === "https://www.twitch.tv/saithsfuff"
      );
      expect(channelLink).toHaveClass("text-pink-500");
    });

    it('includes visually hidden "(opens in new tab)" text', () => {
      render(<TwitchSection />);
      const srTexts = screen.getAllByText("(opens in new tab)");
      expect(srTexts.length).toBeGreaterThan(0);
      srTexts.forEach((el) => {
        expect(el).toHaveClass("sr-only");
      });
    });
  });

  describe("Script component", () => {
    it("loads from correct Twitch embed URL with lazyOnload strategy", () => {
      render(<TwitchSection />);
      expect(scriptProps.src).toBe("https://embed.twitch.tv/embed/v1.js");
      expect(scriptProps.strategy).toBe("lazyOnload");
    });

    it("initializes the embed via onReady so it re-runs on every mount", () => {
      render(<TwitchSection />);
      expect(scriptProps.onLoad).toBeUndefined();

      act(() => {
        (scriptProps.onReady as () => void)();
      });

      expect(mockEmbed).toHaveBeenCalledWith(
        "twitch-embed",
        expect.objectContaining({ channel: "saithsfuff" })
      );
    });
  });

  describe("fallback UI", () => {
    it("renders fallback UI on script error", () => {
      render(<TwitchSection />);

      act(() => {
        (scriptProps.onError as () => void)();
      });

      expect(
        screen.getByText(/Stream unavailable right now/)
      ).toBeInTheDocument();
    });

    it("renders fallback UI on 10-second timeout", () => {
      jest.useFakeTimers();
      render(<TwitchSection />);

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(
        screen.getByText(/Stream unavailable right now/)
      ).toBeInTheDocument();

      jest.useRealTimers();
    });

    it("fallback contains direct link to Twitch channel", () => {
      jest.useFakeTimers();
      render(<TwitchSection />);

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      const fallbackLink = screen.getByText(/Visit saithsfuff on Twitch/);
      expect(fallbackLink).toHaveAttribute(
        "href",
        "https://www.twitch.tv/saithsfuff"
      );
      expect(fallbackLink).toHaveAttribute("target", "_blank");
      expect(fallbackLink).toHaveAttribute("rel", "noopener noreferrer");

      jest.useRealTimers();
    });
  });
});
