# Configuration

The plugin can be configured in multiple ways with the help of plugin options.

#### 1. Simple Configuration

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/path-to-router'

Vue.use(MiddlewarePlugin, router)
```

#### 2. Custom [Middleware Context](context)

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/path-to-router'
import store from '@/path-to-store'

Vue.use(MiddlewarePlugin, {
  router,
  context: { store }
})
```

Now, `store` will be injected as a property in all middleware contexts.

```javascript
export default async ({ store }) => {
  await store.dispatch('app/getData')
}
```

#### 3. Single [Global Middleware](middlewares.html#global-middleware)

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/path-to-router'
import AuthMiddleware from '@/path-to-auth-middleware'

Vue.use(MiddlewarePlugin, {
  router,
  middleware: AuthMiddleware
})
```

If you are wondering, it is possible to ignore a global middleware for individual
routes.

#### 4. Multiple [Global Middlewares](middlewares.html#global-middleware)

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/path-to-router'
import AuthMiddleware from '@/path-to-auth-middleware'
import LoggerMiddleware from '@/path-to-logger-middleware'

Vue.use(MiddlewarePlugin, {
  router,
  middleware: [AuthMiddleware, LoggerMiddleware]
})
```
