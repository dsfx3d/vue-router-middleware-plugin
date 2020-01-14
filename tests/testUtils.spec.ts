import { UnknownError } from '../src/lib/Exceptions/UnknownError'
import { expectErrorClass } from '../src/utils/testUtils'

describe('test utils', () => {
  it('throws Exception if expected error not thrown', () => {
    try {
      // tslint:disable-next-line: no-empty
      expectErrorClass(() => {}, Error)
    } catch (e) {
      expect(e).toBeInstanceOf(UnknownError)
    }
  })
})
