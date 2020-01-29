# Middlewares

A middleware is a function which accepts a [context](context) object as the only
argument.

```javascript
export default ({ app, to, from, redirect }) => {
  console.log('from:', from, ', to:', to)
}
```

You can run a long running task in a middleware.

```javascript
import store from '@/path-to-store'

export default async ({ app, to, from, redirect }) => {
  await store.dispatch('app/aVeryLongRunningTask')
}
```

The middleware pipeline will await for this middleware to
be resolved before startng the execution of next middleware or route.

There are two types of middlewares:

1. [Route Middleware](#route-middleware)
2. [Global Middleware](#global-middleware)

### Route Middleware

1. Attach a middleware to your route

```javascript
new VueRouter({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        middleware: DashboardMiddleware
      }
    },
  ]
})
```

Now the `DashboardMiddleware` is attached to route. When the user
navigates to `/dashboard`, the middleware function will be resolved before entering
the route.

```javascript
  {
    path: '/profile',
    name: 'profile',
    meta: {
      middleware: [ProfileMiddleware, AnalyticsMiddleware]
    }
  },
```

```javascript
  {
    path: '/about',
    name: 'about',
    meta: {
      middleware: {
        ignore: [AuthMiddleware],
        attach: [AnalyticsMiddleware]
      }
    }
  },
]
```

## Global Middleware

```javascript
Vue.use(MiddlewarePlugin, {
  router,
  middleware: AuthMiddleware
})

// or

Vue.use(MiddlewarePlugin, {
  router,
  middleware: [AuthMiddleware, AnalyticsMiddleware]
})
```
