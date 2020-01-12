import { Middleware, MiddlewarePipeline } from '../types/MiddlewareTypes'
import { RouteContext, RouteResolver } from '../types/VueTypes'

export const middlewarePipeline: MiddlewarePipeline = (
  context: RouteContext,
  middleware: Middleware[] | Middleware,
  index = 0
) => {
  if (Array.isArray(middleware) && index === middleware.length) {
    return context.next
  }

  let nextContext: RouteContext
  // tslint:disable-next-line: variable-name
  let thisMiddleware: Middleware

  if (Array.isArray(middleware)) {
    thisMiddleware = middleware[index]
    const nextMiddleware = middlewarePipeline(context, middleware, index + 1)
    nextContext = { ...context, next: nextMiddleware as RouteResolver }
  } else {
    thisMiddleware = middleware
    nextContext = context
  }
  const nextResolver = () => thisMiddleware(nextContext)
  return nextResolver
}
