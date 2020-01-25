# Usage

## Concept

## Types of middlewares

### Global Middlewares

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

### Route Middlewares

```javascript
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      middleware: ({ redirect }) => {
        redirect('/dashboard')
      }
    }
  }
```

```javascript
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      middleware: DashboardMiddleware
    }
  },
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

## Use Cases

### Route Protection

```javascript
```

### Long Running Tasks

```javascript
```
