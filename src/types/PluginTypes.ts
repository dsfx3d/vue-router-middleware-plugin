import { Middleware } from './MiddlewareTypes'
import { Router, Vue } from './VueTypes'

export type Install<T> = (vue: Vue, router?: T) => void

export interface PluginOptions {
  router: Router
  middleware?: Middleware[] | Middleware
}
