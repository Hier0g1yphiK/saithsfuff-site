import { renderHook, act } from '@testing-library/react';
import { usePdfGenerator } from '@/lib/hooks/usePdfGenerator';

const mockGenerateMediaKitPdf = jest.fn();

jest.mock('@/lib/pdf-generator', () => ({
  __esModule: true,
  generateMediaKitPdf: (...args: unknown[]) => mockGenerateMediaKitPdf(...args),
}));

// Mock URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = jest.fn(() => 'blob:http://localhost/fake-url');
const mockRevokeObjectURL = jest.fn();
globalThis.URL.createObjectURL = mockCreateObjectURL;
globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

describe('usePdfGenerator', () => {
  let mockAnchor: Partial<HTMLAnchorElement>;
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    mockAnchor = {
      href: '',
      download: '',
      click: jest.fn(),
    };

    originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return mockAnchor as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tag);
    });

    jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    jest.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('initial state is idle with no error', () => {
    const { result } = renderHook(() => usePdfGenerator());

    expect(result.current.state).toBe('idle');
    expect(result.current.errorMessage).toBeNull();
  });

  it('transitions to generating on generate() call', async () => {
    // Keep the promise pending to observe 'generating' state
    mockGenerateMediaKitPdf.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => usePdfGenerator());

    act(() => {
      result.current.generate();
    });

    expect(result.current.state).toBe('generating');
  });

  it('returns to idle after successful generation', async () => {
    const fakeBlob = new Blob(['fake-pdf'], { type: 'application/pdf' });
    mockGenerateMediaKitPdf.mockResolvedValue(fakeBlob);

    const { result } = renderHook(() => usePdfGenerator());

    await act(async () => {
      await result.current.generate();
    });

    // State should still be 'generating' until the 1-second timeout fires
    expect(result.current.state).not.toBe('error');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.state).toBe('idle');
  });

  it('sets error state and message on failure', async () => {
    mockGenerateMediaKitPdf.mockRejectedValue(new Error('Generation failed'));

    const { result } = renderHook(() => usePdfGenerator());

    await act(async () => {
      await result.current.generate();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.errorMessage).toBe('Failed to generate PDF. Please try again.');
  });

  it('dismissError clears error state', async () => {
    mockGenerateMediaKitPdf.mockRejectedValue(new Error('Generation failed'));

    const { result } = renderHook(() => usePdfGenerator());

    await act(async () => {
      await result.current.generate();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.errorMessage).not.toBeNull();

    act(() => {
      result.current.dismissError();
    });

    expect(result.current.state).toBe('idle');
    expect(result.current.errorMessage).toBeNull();
  });

  it('ignores generate() call when already generating', async () => {
    // Keep the promise pending so we stay in 'generating'
    mockGenerateMediaKitPdf.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => usePdfGenerator());

    // First call — transitions to generating
    await act(async () => {
      result.current.generate();
      // Allow dynamic import microtask to resolve
      await Promise.resolve();
    });

    expect(result.current.state).toBe('generating');

    // Second call — should be ignored because state is 'generating'
    await act(async () => {
      result.current.generate();
      await Promise.resolve();
    });

    // generateMediaKitPdf should only have been called once (second generate was ignored)
    expect(mockGenerateMediaKitPdf).toHaveBeenCalledTimes(1);
  });

  it('shows browser compatibility error when Blob API unavailable', async () => {
    const originalBlob = globalThis.Blob;
    // @ts-expect-error -- deliberately removing Blob for test
    delete globalThis.Blob;

    const { result } = renderHook(() => usePdfGenerator());

    await act(async () => {
      await result.current.generate();
    });

    expect(result.current.state).toBe('error');
    expect(result.current.errorMessage).toBe(
      'PDF download is not supported in your current browser.'
    );

    // Restore
    globalThis.Blob = originalBlob;
  });

  it('download filename is "saithsfuff-media-kit.pdf"', async () => {
    const fakeBlob = new Blob(['fake-pdf'], { type: 'application/pdf' });
    mockGenerateMediaKitPdf.mockResolvedValue(fakeBlob);

    const { result } = renderHook(() => usePdfGenerator());

    await act(async () => {
      await result.current.generate();
    });

    expect(mockAnchor.download).toBe('saithsfuff-media-kit.pdf');
    expect(mockAnchor.click).toHaveBeenCalled();
  });
});
