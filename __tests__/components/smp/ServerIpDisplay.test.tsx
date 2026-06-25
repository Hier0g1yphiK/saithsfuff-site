import { render, screen, act, fireEvent } from "@testing-library/react";
import ServerIpDisplay from "@/components/smp/ServerIpDisplay";

describe("ServerIpDisplay", () => {
  const serverIp = "play.saithsfuff.com";

  beforeEach(() => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe("when clipboard is available", () => {
    it("renders the server IP in a button", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent(serverIp);
    });

    it("displays the IP at text-2xl size", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-2xl");
    });

    it('shows "Click to copy" label in idle state', () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      expect(screen.getByText("Click to copy")).toBeInTheDocument();
    });

    it("includes aria-label for the copy button", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute(
        "aria-label",
        "Copy server IP address to clipboard"
      );
    });

    it("has an aria-live polite region", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      const liveRegion = screen.getByText("Click to copy");
      expect(liveRegion).toHaveAttribute("aria-live", "polite");
    });

    it("copies the IP to clipboard on click", async () => {
      render(<ServerIpDisplay serverIp={serverIp} />);

      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(serverIp);
    });

    it('shows "Copied!" after clicking', async () => {
      render(<ServerIpDisplay serverIp={serverIp} />);

      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(screen.getByText("Copied!")).toBeInTheDocument();
      expect(screen.queryByText("Click to copy")).not.toBeInTheDocument();
    });

    it("reverts to idle state after 2 seconds", async () => {
      render(<ServerIpDisplay serverIp={serverIp} />);

      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });
      expect(screen.getByText("Copied!")).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.getByText("Click to copy")).toBeInTheDocument();
      expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    });

    it("resets timer on repeated clicks", async () => {
      render(<ServerIpDisplay serverIp={serverIp} />);

      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      // Advance 1.5s (still in copied state)
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(screen.getByText("Copied!")).toBeInTheDocument();

      // Click again — should restart the 2s timer
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      // Advance 1.5s from the second click (should still show Copied!)
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(screen.getByText("Copied!")).toBeInTheDocument();

      // Advance remaining 500ms — now should revert
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(screen.getByText("Click to copy")).toBeInTheDocument();
    });

    it("is keyboard accessible (button element)", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("when clipboard is unavailable", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    });

    it("renders the IP as a selectable span (not a button)", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getByText(serverIp)).toBeInTheDocument();
    });

    it("applies user-select: all style for easy manual copy", () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      const ipElement = screen.getByText(serverIp);
      expect(ipElement.tagName).toBe("SPAN");
      expect(ipElement).toHaveStyle({ userSelect: "all" });
    });

    it('does not show "Click to copy" label', () => {
      render(<ServerIpDisplay serverIp={serverIp} />);
      expect(screen.queryByText("Click to copy")).not.toBeInTheDocument();
    });
  });
});
