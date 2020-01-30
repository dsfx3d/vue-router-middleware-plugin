# Helpers

These are the helper functions of the `app` object in the context.

## Properties

### `$MiddlewarePlugin: boolean`

A flag for other plugins to identify `vue-router-middleware-plugin` is installed in the app. This will always be `true`

## Functions

> __Note:__ [Built-In middleware context properties](context.html#built-in-properties) cannot be mutated from theses helper functions. If a built-in property is passed in the arguments it will get overriden by the internal value.

### `$getMiddlewareContext: () => object`

returns the custom middleware context.

```javascript
const context = app.$getMiddlewareContext()
```

### `$setMiddlewareContext: (context: object) => object`

set custom middleware context. This will overide all existing custom properties.

```javascript
const updatedContext = app.$setMiddlewareContext({ foo: 'baz' })
```

### `$updateMiddlewareContext: (key: string, value: any) => void`

add or update a custom middleware context property.

```javascript
app.$updateMiddlewareContext('foo', 'baz')
```
