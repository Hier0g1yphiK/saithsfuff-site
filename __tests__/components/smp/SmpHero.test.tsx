import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SmpHero from "@/components/smp/SmpHero";
import { smpData } from "@/lib/smp-data";

describe("SmpHero", () => {
  it("renders the server name as an h1 heading", () => {
    render(<SmpHero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(smpData.hero.serverName);
  });

  it("applies gradient-text class to the server name", () => {
    const { container } = render(<SmpHero />);
    const gradientSpan = container.querySelector(".gradient-text");
    expect(gradientSpan).toBeInTheDocument();
    expect(gradientSpan).toHaveTextContent(smpData.hero.serverName);
  });

  it("applies font-display class to the heading", () => {
    render(<SmpHero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("font-display");
  });

  it("renders the tagline paragraph", () => {
    render(<SmpHero />);
    const tagline = screen.getByText(smpData.hero.tagline);
    expect(tagline).toBeInTheDocument();
  });

  it("applies font-body class to the tagline", () => {
    render(<SmpHero />);
    const tagline = screen.getByText(smpData.hero.tagline);
    expect(tagline).toHaveClass("font-body");
  });

  it("includes dark mode text class on the tagline", () => {
    render(<SmpHero />);
    const tagline = screen.getByText(smpData.hero.tagline);
    expect(tagline).toHaveClass("dark:text-gray-200");
  });

  it("renders inside a section element with bg-gradient-hero", () => {
    const { container } = render(<SmpHero />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("bg-gradient-hero");
  });

  it("uses section-container class for content wrapper", () => {
    const { container } = render(<SmpHero />);
    const wrapper = container.querySelector(".section-container");
    expect(wrapper).toBeInTheDocument();
  });

  it("keeps tagline at 150 characters or fewer", () => {
    expect(smpData.hero.tagline.length).toBeLessThanOrEqual(150);
  });
});
