# Context

The `context` or middleware context is the only argument of a middleware function.

```javascript
export default context => {
  const { app, to, from, redirect } = context

  if (to.path === '/protected') {
    redirect(from)
  }
}
```

## Custom Context

The context can be extend by adding custom properties in plugin options.

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

In this case, you could've imported the store in the middleware module instead of
adding it as a custom context property.

```javascript
import store from '@/path-to-store'

export default async () => {
  await store.dispatch('app/getData')
}
```

If you are thinking what's the point of adding custom context. It will depend on
the use case and personal preferences of a developer. One such case might be,
if you are lazy and don't want to import the same module in multiple middlewares.

The idea behind adding custom context was so that other plugins can leverage it
to inject functionalities which can used inside a middleware, but there's more than
that. With the context, you can carry state in the middleware pipeline.

### Dynamic Custom Context

The custom context properties can be mutated with the helper functions exposed to
the middleware via `app` context. The ability to mutate the custom context properties
makes it possible to use these properties as middleware state.

Initialize the state in plugin options.

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/path-to-router'

Vue.use(MiddlewarePlugin, {
  router,
  context: { dashboardVisits: 0 }
})
```

Mutate `dashboardVisits` in any middleware function.

```javascript
export default ({ app, to, dashboardVisits }) => {
  if (to.path === '/dashboard') {
    app.$setMiddlewareContext({ dashboardVisits: dashboardVisits + 1 })
  }
}
```

> You cannot mutate built-in context properties. Like `redirect`, `from` etc.

Goto [API References](/api/context) to find out more about helper functions and
`app` context.
