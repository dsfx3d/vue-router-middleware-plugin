# Middleware

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

## Route Middleware

These middlewares are attached to a route inside the route object.

```javascript
import DashboardMiddleware from '@/path-to-middleware'

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

Now the `DashboardMiddleware` is attached to the route. When the user
navigates to `/dashboard`, the middleware function will be resolved before entering
the route.

You can also attach multiple middlewares to a route.

```javascript
import ProfileMiddleware from '@/path-to-middleware'
import AnalyticsMiddleware from '@/path-to-analytics-middleware'

.
.

  {
    path: '/profile',
    name: 'profile',
    meta: {
      middleware: [ProfileMiddleware, AnalyticsMiddleware]
    }
  },
```

## Global Middleware

As the name suggests they are globally attached to all the routes of your app.

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

Now, the `AuthMiddleware` and `AnalyticsMiddleware` will be resolved before each
route of your app.

If you want, you can ignore any global middleware in any route.

```javascript
  {
    path: '/contact',
    name: 'contact',
    meta: {
      middleware: {
        ignore: AuthMiddleware,
        attach: AnalyticsMiddleware
      }
    }
  },
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

Any middleware of property `igonre` will be skipped by the middleware pipeline.
This include both global and route middlewares.

You can attach a middleware to a route using `attach`.

## Middleware Pipeline

The middleware pipeline is a queue of middlewares which needs to be resolved before
entering a route. All Middlewares will be resolved sequentially in order. For example,

```javascript
  {
    path: '/profile',
    name: 'profile',
    meta: {
      middleware: [ProfileMiddleware, AnalyticsMiddleware]
    }
  },
```

In this route, `ProfileMiddleware` will be resolved before `AnalyticsMiddleware`.

Global Middlewares have precendence over route middlewares i.e. they will be resolved
sequentially in order before any route middlewares.

:+1: Thank you, hope you find this plugin useful.
