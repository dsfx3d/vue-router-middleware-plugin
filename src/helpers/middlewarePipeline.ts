import { InvalidPipelinePayload } from '../lib/Exceptions/InvalidPipelinePayloads'
import { Middleware } from '../types/MiddlewareTypes'
import { RouteContext, RouteResolver } from '../types/VueTypes'

export const middlewarePipeline = (
  context: RouteContext,
  middlewares: Middleware[],
  index = 0
) => {
  if (!Array.isArray(middlewares)) {
    throw new InvalidPipelinePayload()
  }

  if (index === middlewares.length) {
    return context.next
  }

  const thisMiddleware = middlewares[index]
  const nextMiddleware = middlewarePipeline(context, middlewares, index + 1)
  const thisContext = { ...context, next: nextMiddleware as RouteResolver }

  const nextResolver = () => thisMiddleware(thisContext)
  return nextResolver
}
