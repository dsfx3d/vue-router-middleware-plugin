import { middlewarePipeline } from './helpers/middlewarePipeline'
import { OptionsMissingPluginError } from './lib/Exceptions/OptionsMissingPluginError'
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
  const router: Router =
    options && (options as PluginOptions).router
      ? (options as PluginOptions).router
      : (options as Router)

  /* istanbul ignore else */
  if (router === undefined) {
    throw new OptionsMissingPluginError('router is a required option.')
  } else {
    const routeHook: RouteHook = (
      to: Route,
      from: Route,
      next: RouteResolver
    ) => {
      if (!to.meta.middleware) {
        next()
      } else {
        const context: RouteContext = { to, from, next }
        const routeResolver = middlewarePipeline(
          context,
          to.meta.middleware
        ) as RouteResolver
        routeResolver()
      }
    }

    router.beforeEach(routeHook)
  }
}
