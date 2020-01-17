import { RouteContext, RouteResolver } from './VueTypes'

export type Middleware = (context: RouteContext) => void

export interface MiddlewarePipeline {
  ignore?: Middleware[] | Middleware
  attach?: Middleware[] | Middleware
}
