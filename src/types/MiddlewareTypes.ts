import { RouteContext, RouteResolver } from './VueTypes'

export type Middleware = (context: RouteContext) => void

export type MiddlewarePipeline = (
  context: RouteContext,
  middleware: Middleware[] | Middleware,
  index?: number
) => Middleware | RouteResolver | void
