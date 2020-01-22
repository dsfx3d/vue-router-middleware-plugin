import { middlewarePipeline } from '../src/core/middlewarePipeline'
import { InvalidPipelinePayload } from '../src/lib/Exceptions/InvalidPipelinePayloads'
import { Middleware } from '../src/types/MiddlewareTypes'
import { RouteContext, RouteResolver } from '../src/types/VueTypes'
import { expectErrorClass } from '../src/utils/testUtils'

const executePipeline = async (
  resolver: RouteResolver,
  middleware: Middleware[]
) => {
  // tslint:disable-next-line: no-object-literal-type-assertion
  const context = {
    next: resolver
  } as RouteContext
  await middlewarePipeline(context, middleware)
}

describe('Middleware Pipeline: Single Middleware', () => {
  it('executes middleware', () => {
    let middlewareExecuted = false
    const middleware: Middleware = (context: RouteContext) => {
      middlewareExecuted = true
      context.next()
    }
    const routeResolver: RouteResolver = () => {
      expect(middlewareExecuted).toBeTruthy()
    }
    expectErrorClass(async () => {
      await executePipeline(
        routeResolver,
        (middleware as unknown) as Middleware[]
      )
    }, InvalidPipelinePayload)
  })
})

describe('Middleware Pipeline: Multiple Middlewares', () => {
  it('executes all middlewares', async () => {
    let counter = 0
    const middleware = (context: RouteContext) => {
      counter++
    }
    const middlewares: Middleware[] = [middleware, middleware, middleware]
    const routeResolver: RouteResolver = () => {
      expect(counter).toEqual(middlewares.length)
    }
    await executePipeline(routeResolver, middlewares)
  })
})
