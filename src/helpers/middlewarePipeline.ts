// tslint:disable-next-line: no-submodule-imports no-implicit-dependencies
import 'regenerator-runtime/runtime'
import { InvalidPipelinePayload } from '../lib/Exceptions/InvalidPipelinePayloads'
import { Middleware } from '../types/MiddlewareTypes'
import { Route, RouteContext } from '../types/VueTypes'

export const middlewarePipeline = async (
  context: RouteContext,
  middlewares: Middleware[]
) => {
  if (!Array.isArray(middlewares)) {
    throw new InvalidPipelinePayload()
  }

  let redirected: boolean = false

  const redirect = (arg: boolean | string | Route) => {
    if (arg === undefined) {
      return
    }
    context.next(arg)
    redirected = true
  }

  for (const middleware of middlewares) {
    const { next: _, ...middlewareContext } = context
    await middleware({ ...middlewareContext, redirect })
    if (redirected) {
      break
    }
  }

  if (!redirected) {
    context.next()
  }
}
