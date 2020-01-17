import { retuenMiddlewareArray } from '../src/helpers/returnMiddlewareArray'
import { NotAMiddleware } from '../src/lib/Exceptions/NotAMiddleware'
import { expectErrorClass } from '../src/utils/testUtils'

describe('returnMiddlewareArray', () => {
  it('throws error if first argument is not a function or array of functions', () => {
    expectErrorClass(() => retuenMiddlewareArray(1), NotAMiddleware)
    expectErrorClass(() => retuenMiddlewareArray([1]), NotAMiddleware)
  })

  it('throw error if second argument is explicitly passed as not an array of middlewares', () => {
    expectErrorClass(
      () => retuenMiddlewareArray([], (1 as unknown) as []),
      NotAMiddleware
    )
    expectErrorClass(() => retuenMiddlewareArray([], [1]), NotAMiddleware)
  })

  it('returns an array of middleware if a middleware is passed as first argument', () => {
    const middleware = () => ({})
    const middlewares = retuenMiddlewareArray(middleware)
    expect(Array.isArray(middlewares)).toBeTruthy()
    expect(middlewares.length).toBe(1)
    expect(middlewares[0] === middleware).toBeTruthy()
  })

  it('returns an array which contains middleware passed as first argument pushed to the second argument', () => {
    const middleware = () => 1
    const middleware2 = () => 2
    const originMiddlewares = [middleware]

    const middlewares = retuenMiddlewareArray(middleware2, originMiddlewares)
    expect(Array.isArray(middlewares)).toBeTruthy()
    expect(middlewares.length).toBe(2)
    expect(middlewares[0] === middleware).toBeTruthy()
    expect(middlewares[1] === middleware2).toBeTruthy()
  })

  it('is an identity function if an array of middlewares is passed as first argument and second argument is not passed', () => {
    const middleware = () => 1
    const middleware2 = () => 2
    const originMiddlewares = [middleware, middleware2]

    const middlewares = retuenMiddlewareArray(originMiddlewares)
    expect(Array.isArray(middlewares)).toBeTruthy()
    expect(middlewares.length).toBe(2)
    expect(middlewares[0] === middleware).toBeTruthy()
    expect(middlewares[1] === middleware2).toBeTruthy()
  })

  it('returns an array of middlewares after joining first and second argument if both are arrays of middlewares', () => {
    const middleware = () => 1
    const middleware2 = () => 2
    const middleware3 = () => 3
    const originMiddlewares = [middleware, middleware2]
    const originMiddlewares2 = [middleware2, middleware3]

    const middlewares = retuenMiddlewareArray(
      originMiddlewares,
      originMiddlewares2
    )
    expect(Array.isArray(middlewares)).toBeTruthy()
    expect(middlewares.length).toBe(4)
    expect(middlewares[0] === middleware2).toBeTruthy()
    expect(middlewares[1] === middleware3).toBeTruthy()
    expect(middlewares[2] === middleware).toBeTruthy()
    expect(middlewares[3] === middleware2).toBeTruthy()
  })
})
