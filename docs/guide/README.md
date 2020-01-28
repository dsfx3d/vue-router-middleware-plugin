# Quickstart

## Get Started in 3 Easy Steps

1. Register middleware plugin in your app.

    ```javascript
    import Vue from 'vue'
    import MiddlewarePlugin from 'vue-router-middleware-plugin'
    import router from '@/path-to-router'

    Vue.use(MiddlewarePlugin, router)
    ```

2. Create a middleware function.

    ```javascript
    import store from '@/path-to-store'

    export default ({ to, from, redirect }) => {
      if (!store.getters.isLoggedIn) {
        redirect('/login')
      }
    }
    ```

3. Attach middleware to a route.

```javascript
import AuthMiddleware from '@/path-to-auth-middleware'

export default new VueRouter({
  routes: [
    {
      path: '/',
      meta: {
        middleware: AuthMiddleware
      },
      .
      .
    },
```

Note: You may attach multiple middlewares to a route.

```javascript
  {
    path: '/login',
    meta: {
      middleware: [LoggerMiddleware, AnalyticsMiddleware]
    },
    .
    .
  },
```

Easy as that to get started. For advanced features continue to [configurations](configurations).
