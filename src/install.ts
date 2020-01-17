import { middlewarePipeline } from './helpers/middlewarePipeline'
import { retuenMiddlewareArray } from './helpers/returnMiddlewareArray'
import { OptionsMissingPluginError } from './lib/Exceptions/OptionsMissingPluginError'
import { Middleware } from './types/MiddlewareTypes'
import { Install, PluginOptions } from './types/PluginTypes'
import {
  Route,
  RouteContext,
  RouteHook,
  Router,
  RouteResolver,
  Vue
} from './types/VueTypes'

export const install: Install<Router | PluginOptions> = (
  vue: Vue,
  options?: Router | PluginOptions
) => {
  let router: Router
  let middlewares: Middleware[] = []

  if (options && (options as PluginOptions).router) {
    const { router: _router, middleware } = options as PluginOptions
    router = _router

    /* istanbul ignore if */
    if (middleware !== undefined) {
      middlewares = retuenMiddlewareArray(middleware)
    }
  } else {
    router = options as Router
  }

  /* istanbul ignore else */
  if (router === undefined) {
    throw new OptionsMissingPluginError('router is a required option.')
  } else {
    const routeHook: RouteHook = (
      to: Route,
      from: Route,
      next: RouteResolver
    ) => {
      if ('middleware' in to.meta) {
        if (typeof to.meta.middleware === 'object') {
          let ignores: Middleware[] = []
          if ('attach' in to.meta.middleware) {
            middlewares = retuenMiddlewareArray(
              to.meta.middleware.attach,
              middlewares
            )
          }
          if ('ignore' in to.meta.middleware) {
            ignores = retuenMiddlewareArray(to.meta.middleware.ignore)
          }

          middlewares = middlewares.filter(
            middleware => !ignores.includes(middleware)
          )
        } else {
          middlewares = retuenMiddlewareArray(to.meta.middleware, middlewares)
        }
      }
      if (middlewares.length) {
        const context: RouteContext = { to, from, next }
        const routeResolver = middlewarePipeline(
          context,
          middlewares
        ) as RouteResolver
        routeResolver()
      } else {
        next()
      }
    }

    router.beforeEach(routeHook)
  }
}
