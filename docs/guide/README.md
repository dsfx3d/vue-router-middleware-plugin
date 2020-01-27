# Quickstart

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/path-to-router'

Vue.use(MiddlewarePlugin, router)
```

```javascript
import store from '@/path-to-store'

export default ({ to, from, redirect }) => {
  if (!store.getters.isLoggedIn) {
    redirect('/login')
  }
}
```

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
    {
      path: '/login',
      meta: {
        middleware: [LoggerMiddleware, AnalyticsMiddleware]
      },
      .
      .
    }
  ]
})
```

Easy as that to get started. For advanced features continue to [configurations](/configurations).
