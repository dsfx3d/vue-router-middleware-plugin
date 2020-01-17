import { Middleware, MiddlewarePipeline } from './MiddlewareTypes'

// vue plugin
export interface Plugin {}

// vue
export interface Vue {
  use?: (plugin: Plugin, router?: Router) => void
}

// router types
export type RouteHook = (to: Route, from: Route, next: RouteResolver) => void
export interface Router {
  routeHook: RouteHook
  beforeEach?: (routeHook: RouteHook) => void
}

// route types
export type RouteResolver = (arg?: boolean | string | Route) => void
export interface RouteContext {
  to?: Route
  from?: Route
  next?: RouteResolver
  [key: string]: any
}
export interface RouteMeta {
  middleware?: Middleware[] | Middleware | MiddlewarePipeline
}
export interface Route {
  meta: RouteMeta
}
