import * as fc from 'fast-check';
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

/**
 * **Validates: Requirements 2.5, 10.4**
 *
 * Property 9: No download on generation failure
 *
 * For any input that causes the PDF generator to throw an error,
 * the system SHALL NOT trigger a file download or produce a Blob
 * that is passed to the download mechanism, and error state is set.
 */
describe('Property 9: No download on generation failure', () => {
  let mockAnchor: Partial<HTMLAnchorElement>;
  let originalCreateElement: typeof document.createElement;
  let createElementSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    mockAnchor = {
      href: '',
      download: '',
      click: jest.fn(),
    };

    originalCreateElement = document.createElement.bind(document);
    createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
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

  it('no Blob is passed to download and error state is set when generation throws', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 200 }),
        async (errorMessage) => {
          // Reset mocks for each iteration
          mockCreateObjectURL.mockClear();
          mockGenerateMediaKitPdf.mockReset();
          createElementSpy.mockClear();

          // Mock the PDF generator to throw with the random error message
          mockGenerateMediaKitPdf.mockRejectedValue(new Error(errorMessage));

          const { result } = renderHook(() => usePdfGenerator());

          await act(async () => {
            await result.current.generate();
          });

          // Assert error state is set
          expect(result.current.state).toBe('error');

          // Assert errorMessage is non-null
          expect(result.current.errorMessage).not.toBeNull();
          expect(result.current.errorMessage!.length).toBeGreaterThan(0);

          // Assert URL.createObjectURL was NOT called (no Blob passed to download)
          expect(mockCreateObjectURL).not.toHaveBeenCalled();

          // Assert no anchor element was created for download
          const anchorCalls = createElementSpy.mock.calls.filter(
            (call: unknown[]) => call[0] === 'a'
          );
          expect(anchorCalls).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
