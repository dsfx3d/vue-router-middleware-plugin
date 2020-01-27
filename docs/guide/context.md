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

It always contain a few built-in properties but can also be extended to include [custom properties](/api/context.html#adding-custom-properties) as per use case.
