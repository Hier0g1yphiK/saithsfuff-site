import { render, screen, fireEvent, act } from "@testing-library/react";
import ErrorToast from "@/components/media-kit/ErrorToast";

describe("ErrorToast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders error message text", () => {
    render(<ErrorToast message="Something went wrong" onDismiss={() => {}} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("close button triggers onDismiss callback", () => {
    const onDismiss = jest.fn();
    render(<ErrorToast message="Error occurred" onDismiss={onDismiss} />);

    const closeButton = screen.getByRole("button", { name: /dismiss/i });
    fireEvent.click(closeButton);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after 10 seconds", () => {
    const onDismiss = jest.fn();
    render(<ErrorToast message="Error occurred" onDismiss={onDismiss} />);

    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('has role="alert" and aria-live="assertive"', () => {
    render(<ErrorToast message="Accessible error" onDismiss={() => {}} />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveAttribute("aria-live", "assertive");
  });

  it("is positioned fixed at bottom-right", () => {
    const { container } = render(
      <ErrorToast message="Positioned toast" onDismiss={() => {}} />
    );

    const toastElement = container.querySelector('[role="alert"]');
    expect(toastElement).toHaveClass("fixed", "bottom-4", "right-4");
  });
});
