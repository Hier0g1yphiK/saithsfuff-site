import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder
  // @ts-expect-error TextDecoder type mismatch between node and dom
  globalThis.TextDecoder = TextDecoder
}
