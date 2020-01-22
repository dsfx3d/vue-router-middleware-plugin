import 'regenerator-runtime/runtime'
import { UnknownError } from '../lib/Exceptions/UnknownError'
import { RouteHook, Router } from '../types/VueTypes'

export const expectErrorClass = async (fn: () => void, ErrorClass: unknown) => {
  try {
    await fn()
    throw new UnknownError()
  } catch (e) {
    expect(e).toBeInstanceOf(ErrorClass)
  }
}

export class VueRouter implements Router {
  public routeHook: RouteHook
  public beforeEach(routeHook: RouteHook): void {
    this.routeHook = routeHook
  }
}
