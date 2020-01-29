# Introduction

In this context, a middleware is a block of code that will run when navigating
from one route to another.

The Vue Router offers [navigation guard API](https://router.vuejs.org/guide/advanced/navigation-guards.html)
which can be used to add control logic between your routes but they can easily make
your route objects messy and difficult to read and there's no easy way of reusing
same logic in multiple routes.

The plugin utilizes navigation guards to implement easy to use, readable and more
organized middlewares for your routes.

### Installation

```bash
npm i -S vue-router-middleware-plugin
```
