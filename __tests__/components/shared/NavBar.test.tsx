import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "@/components/shared/NavBar";

let mockPathname = "/";
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

let mockLive = false;
// Relative path: next/jest rewrites "@/" aliases in imports, not in jest.mock.
jest.mock("../../../lib/useTwitchLive", () => ({
  useTwitchLive: () => mockLive,
}));

// ThemeToggle needs window.matchMedia, which jsdom lacks.
jest.mock("../../../components/shared/ThemeToggle", () => () => null);

beforeEach(() => {
  mockPathname = "/";
  mockLive = false;
});

describe("NavBar", () => {
  it("marks the current page with aria-current", () => {
    mockPathname = "/smp/";
    render(<NavBar />);
    const current = screen
      .getAllByRole("link", { name: "SMP" })
      .filter((link) => link.getAttribute("aria-current") === "page");
    expect(current).toHaveLength(2); // desktop + mobile
    screen.getAllByRole("link", { name: "Home" }).forEach((link) => {
      expect(link).not.toHaveAttribute("aria-current");
    });
  });

  it("hides the collapsed mobile menu from keyboard users", () => {
    render(<NavBar />);
    const menu = document.getElementById("mobile-menu")!;
    expect(menu).toHaveClass("invisible");

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(menu).toHaveClass("visible");
    expect(menu).not.toHaveClass("invisible");
  });

  it("shows the LIVE badge only while streaming", () => {
    const { rerender } = render(<NavBar />);
    expect(screen.queryByText(/streaming now/)).not.toBeInTheDocument();

    mockLive = true;
    rerender(<NavBar />);
    expect(screen.getByText(/streaming now/).closest("a")).toHaveAttribute(
      "href",
      "https://www.twitch.tv/saithsfuff"
    );
  });
});
