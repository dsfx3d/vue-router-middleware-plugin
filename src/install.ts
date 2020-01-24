import { middlewarePipeline } from './core/middlewarePipeline'
import { prepareMiddlewarePipelinePayload as preparePipelinePayload } from './helpers/prepareMiddlewareiPiplinePayload'
import { InvalidOptions } from './lib/Exceptions/InvalidOptions'
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
import { BasePluginError } from './lib/Exceptions/BasePluginError'

export const install: Install<Router | PluginOptions> = (
  vue: Vue,
  options?: Router | PluginOptions
) => {
  if (typeof options !== 'object') {
    throw new InvalidOptions()
  }

  let router: Router
  let globalMiddlewares: Middleware[] = []
  let context: RouteContext = { app: vue }

  if (options && (options as PluginOptions).router) {
    // if options object
    const {
      router: _router,
      middleware,
      context: _context
    } = options as PluginOptions
    router = _router

    /* istanbul ignore if */
    if (middleware !== undefined) {
      globalMiddlewares = preparePipelinePayload(middleware)
    }

    if (_context !== undefined) {
      /* istanbul ignore if */
      if (typeof _context === 'object') {
        context = { ..._context, ...context }
      } else {
        throw new InvalidOptions('invalid context')
      }
    }
  } else if (
    (options as PluginOptions).router === undefined &&
    (options as Router).beforeEach === undefined
  ) {
    // if options is not object and not router
    throw new InvalidOptions('router is a required option.')
  } else {
    // if options is router
    router = options as Router
  }

  // ==== helpers ============
  vue.$MiddlewarePlugin = true
  vue.$getMiddlewareContext = () => context
  vue.$setMiddlewareContext = (_context: any): any => {
    const { app } = context
    context = { ..._context, app }
    return context
  }
  vue.$updateMiddlewareContext = (key: string, value: any) => {
    const { to, from, redirect, app } = context
    context = { [key]: value, to, from, redirect, app }
  }

  /* istanbul ignore next */
  const routeHook: RouteHook = (
    to: Route,
    from: Route,
    next: RouteResolver
  ) => {
    let middlewares = [...globalMiddlewares]
    if ('middleware' in to.meta) {
      if (typeof to.meta.middleware === 'object') {
        let ignores: Middleware[] = []
        if ('attach' in to.meta.middleware) {
          middlewares = preparePipelinePayload(
            to.meta.middleware.attach,
            middlewares
          )
        }
        if ('ignore' in to.meta.middleware) {
          ignores = preparePipelinePayload(to.meta.middleware.ignore)
        }

        middlewares = middlewares.filter(
          middleware => !ignores.includes(middleware)
        )
      } else {
        middlewares = preparePipelinePayload(to.meta.middleware, middlewares)
      }
    }

    if (middlewares.length) {
      context = { ...context, to, from, next }
      middlewarePipeline(context, middlewares)
    } else {
      next()
    }

    router.beforeEach(routeHook)
  }
}
