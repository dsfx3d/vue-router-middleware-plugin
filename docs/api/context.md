# Context

The `context` or middleware context is the only argument in all middleware functions. It's an object which provide properties which can be used to control the behaviour of a middleware

```javascript
export default ({ app, to, from, redirect }) => {
  if (to.path === '/protected') {
    redirect(from)
  } else {
    const { visits } = app.$getMiddlewareContext()
    app.$updateMiddlewareContext('visits', (visits || 0) + 1)
  }
}
```

## Built-In Properties

The context has the following built-in properties:

### `app: VueConstructor`

A regular vue constructor with injected plugin [options](options/).

### `to: Route`

The target [Route Object](https://router.vuejs.org/api/#the-route-object) being navigated to.

*An argument from [Navigation Guard](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)*

### `from: Route`

The target [Route Object](https://router.vuejs.org/api/#the-route-object) being navigated from.

*An argument from [Navigation Guard](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)*

### `redirect: function`

A function to redirect to any route. Accepts same arguments as the `next` function in a [Navigation Guard](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards) but unlike a navigation guard, it's not required to be called in each middleware in order to resolve it.

## Adding custom properties

From the example above, we are appearently adding a property `visits` to the middleware context. Goto [options](options/) for more.
