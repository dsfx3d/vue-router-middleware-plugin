# Options

These plugin options can be used to configure the plugin on registration.

```javascript
Vue.use(MiddlewarePlugin, {
  router,
  middleware,
  context
})
```

## Options Properties

### `router: VueRouter`

The vue router instance of your app.

### `middleware?: function | Array<function>`

The middleware property is used to register global middlewares, it can be set to either a single middleware function or an array of middleware functions. _(optional)_

### `context?: object`

This option is used to add custom properties to the default middleware context. The context object is merged with the middleware context on plugin registration. _(optional)_
