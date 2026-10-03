import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SocialLinksSection from "@/components/links/SocialLinksSection";
import PartnersSection from "@/components/links/PartnersSection";
import NavBar from "@/components/shared/NavBar";
import LinksPage from "@/app/links/page";

// Mock window.matchMedia for ThemeToggle (used inside NavBar)
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// ─── Social Links Section ────────────────────────────────────────────────────

describe("SocialLinksSection", () => {
  it("renders all 9 social links with correct hrefs", () => {
    render(<SocialLinksSection />);

    const expectedLinks = [
      { name: "Instagram", href: "https://instagram.com/saithsfuff" },
      {
        name: "TikTok",
        href: "https://www.tiktok.com/@saithsfuff",
        exact: true,
      },
      { name: "Twitch", href: "https://twitch.tv/saithsfuff" },
      { name: "Twitter", href: "https://twitter.com/saithsfuff" },
      {
        name: "BlueSky",
        href: "https://bsky.app/profile/saithsfuff.bsky.social",
      },
      { name: "YouTube", href: "https://www.youtube.com/saithsfuff" },
      { name: "Threads", href: "https://www.threads.net/@saithsfuff" },
      { name: "Clips TikTok", href: "https://www.tiktok.com/@ttv.saithsfuff" },
      { name: "Discord", href: "https://discord.gg/fuff" },
    ];

    const allLinks = screen.getAllByRole("link");

    for (const { name, href, exact } of expectedLinks) {
      let link: HTMLElement;
      if (exact) {
        // Use exact match to distinguish "TikTok" from "Clips TikTok"
        link = allLinks.find(
          (el) =>
            el.textContent?.includes(name) && !el.textContent?.includes("Clips")
        )!;
      } else {
        link = screen.getByRole("link", { name: new RegExp(name) });
      }
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("renders the Social Media section heading", () => {
    render(<SocialLinksSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /social media/i })
    ).toBeInTheDocument();
  });
});

// ─── Partners Section ────────────────────────────────────────────────────────

describe("PartnersSection", () => {
  const expectedPartners = [
    {
      name: "Throne",
      href: "https://throne.com/saithsfuff/wishlist",
      description: "Proud to be a Throne Partner!",
    },
    {
      name: "Kinetic Hosting",
      href: "https://kinetichosting.net/",
      description:
        "Need a server? Use code 'SAITHSFUFF' for 15% off every month at Kinetic Hosting!",
    },
    {
      name: "Pin-Ace",
      href: "https://pin-ace.com/SAITHSFUFF",
      description:
        "Pride Pins! Use code 'SAITHSFUFF' for 15% off your entire order!",
    },
    {
      name: "Oodie",
      href: "https://www.theoodie.co.uk/FAITHSAITHSFUFF",
      description: "Use code 'SAITHSFUFF15' for 15% off your oodie!",
    },
    {
      name: "Divoom",
      href: "https://divoom.com/saithsfuff",
      description: "Use code 'SAITHSFUFF' for 10% off your entire order!",
    },
    {
      name: "Charlotte Tilbury",
      href: "https://friends.charlottetilbury.com/s/saithsfuff",
      description: "Use code 'saithsfuffSMJ95' for 15% off your order!",
    },
  ];

  it("renders all 6 partner links with correct hrefs", () => {
    render(<PartnersSection />);

    for (const { name, href } of expectedPartners) {
      const link = screen.getByRole("link", { name: new RegExp(name) });
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("renders partner descriptions", () => {
    render(<PartnersSection />);

    for (const { description } of expectedPartners) {
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });

  it("renders the Partners & Sponsors section heading", () => {
    render(<PartnersSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /partners & sponsors/i })
    ).toBeInTheDocument();
  });
});

// ─── Heading Hierarchy ───────────────────────────────────────────────────────

describe("LinksPage heading hierarchy", () => {
  it("renders a single h1 heading", () => {
    render(<LinksPage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("renders h2 headings for each content section", () => {
    render(<LinksPage />);
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThanOrEqual(2);
    expect(h2s.some((h) => /social media/i.test(h.textContent || ""))).toBe(
      true
    );
    expect(
      h2s.some((h) => /partners & sponsors/i.test(h.textContent || ""))
    ).toBe(true);
  });
});

// ─── NavBar ──────────────────────────────────────────────────────────────────

describe("NavBar", () => {
  it('includes a "Links" navigation item pointing to /links', () => {
    render(<NavBar />);
    // NavBar renders links for both desktop and mobile menus
    const linksNavItems = screen.getAllByRole("link", { name: /^links$/i });
    expect(linksNavItems.length).toBeGreaterThanOrEqual(1);
    expect(linksNavItems[0]).toHaveAttribute("href", "/links");
  });
});

// ─── Semantic Landmarks ──────────────────────────────────────────────────────

describe("LinksPage semantic landmarks", () => {
  it("renders a main landmark", () => {
    render(<LinksPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders section elements for content areas", () => {
    const { container } = render(<LinksPage />);
    const sections = container.querySelectorAll("section");
    // At least: LinksHero, SocialLinksSection, PartnersSection
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });
});
