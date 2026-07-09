import { render, screen, fireEvent } from "@testing-library/react";
import DownloadMediaKitButton from "@/components/media-kit/DownloadMediaKitButton";
import { usePdfGenerator } from "@/lib/hooks/usePdfGenerator";

jest.mock("@/lib/hooks/usePdfGenerator");
const mockUsePdfGenerator = usePdfGenerator as jest.MockedFunction<
  typeof usePdfGenerator
>;

// Suppress ErrorToast portal/fixed-position rendering in tests
jest.mock("@/components/media-kit/ErrorToast", () => {
  return function MockErrorToast({
    message,
    onDismiss,
  }: {
    message: string;
    onDismiss: () => void;
  }) {
    return (
      <div data-testid="error-toast">
        <span>{message}</span>
        <button onClick={onDismiss}>Dismiss</button>
      </div>
    );
  };
});

function setupMock(
  overrides: Partial<ReturnType<typeof usePdfGenerator>> = {}
) {
  const defaults: ReturnType<typeof usePdfGenerator> = {
    generate: jest.fn(),
    state: "idle",
    errorMessage: null,
    dismissError: jest.fn(),
  };
  mockUsePdfGenerator.mockReturnValue({ ...defaults, ...overrides });
  return { ...defaults, ...overrides };
}

describe("DownloadMediaKitButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct label, icon, and gradient classes", () => {
    setupMock();
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Download Media Kit");
    // Gradient classes
    expect(button.className).toContain("bg-gradient-to-r");
    expect(button.className).toContain("from-pink-400");
    expect(button.className).toContain("to-lavender-400");
    // Has download icon (non-spinner SVG with stroke)
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).not.toHaveClass("animate-spin");
  });

  it("shows loading spinner when generating", () => {
    setupMock({ state: "generating" });
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin");
  });

  it("button is disabled during generation (ignores additional clicks)", () => {
    const mockGenerate = jest.fn();
    setupMock({ state: "generating", generate: mockGenerate });
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    // The button is disabled so the click handler won't fire on a disabled button,
    // but even if it did, the hook guards against double-generation
    expect(mockGenerate).not.toHaveBeenCalled();
  });

  it("button re-enables after success (idle state)", () => {
    setupMock({ state: "idle" });
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    expect(button).not.toBeDisabled();
  });

  it("button re-enables after failure (error state)", () => {
    setupMock({ state: "error", errorMessage: "Something went wrong" });
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    // In error state, button is not disabled (only disabled during 'generating')
    expect(button).not.toBeDisabled();
  });

  it("dark mode gradient classes applied", () => {
    setupMock();
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    expect(button.className).toContain("dark:from-lavender-500");
    expect(button.className).toContain("dark:to-pink-500");
  });

  it("minimum 44×44 tap target and aria-label present", () => {
    setupMock();
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    expect(button).toHaveAttribute("aria-label", "Download Media Kit");
    expect(button.className).toContain("min-h-[44px]");
    expect(button.className).toContain("min-w-[44px]");
  });

  it("calls generate when clicked in idle state", () => {
    const mockGenerate = jest.fn();
    setupMock({ state: "idle", generate: mockGenerate });
    render(<DownloadMediaKitButton />);

    const button = screen.getByRole("button", { name: "Download Media Kit" });
    fireEvent.click(button);
    expect(mockGenerate).toHaveBeenCalledTimes(1);
  });

  it("renders error toast when in error state with a message", () => {
    setupMock({ state: "error", errorMessage: "PDF generation failed" });
    render(<DownloadMediaKitButton />);

    expect(screen.getByTestId("error-toast")).toBeInTheDocument();
    expect(screen.getByText("PDF generation failed")).toBeInTheDocument();
  });

  it("does not render error toast when state is idle", () => {
    setupMock({ state: "idle", errorMessage: null });
    render(<DownloadMediaKitButton />);

    expect(screen.queryByTestId("error-toast")).not.toBeInTheDocument();
  });
});
