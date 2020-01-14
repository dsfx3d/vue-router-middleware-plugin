import { UnknownError } from '../lib/Exceptions/UnknownError'

export const expectErrorClass = (fn: () => void, ErrorClass: unknown) => {
  try {
    fn()
    throw new UnknownError()
  } catch (e) {
    expect(e).toBeInstanceOf(ErrorClass)
  }
}
