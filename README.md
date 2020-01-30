# Vue Router Middleware Plugin

A vue-router middleware pipeline.

[![npm version](https://badge.fury.io/js/vue-router-middleware-plugin.svg)](https://badge.fury.io/js/vue-router-middleware-plugin)
[![Build Status](https://travis-ci.org/dsfx3d/vue-router-middleware-plugin.svg?branch=master)](https://travis-ci.org/dsfx3d/vue-router-middleware-plugin)
[![code cove](https://codecov.io/gh/dsfx3d/vue-router-middleware-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/dsfx3d/vue-router-middleware-plugin/branch/master/graph/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d1ab723bcfaa460aa9d12ccc7a54bf65)](https://www.codacy.com/manual/dsfx3d/vue-router-middleware-plugin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dsfx3d/vue-router-middleware-plugin&amp;utm_campaign=Badge_Grade)
![vue-router-middleware-plugin](https://badgen.net/bundlephobia/minzip/vue-router-middleware-plugin)

The plugin utilizes [vue-router navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
to implement easy to use, readable and more organized middlewares for your routes.

## Installation

Install using NPM

```bash
npm i -S vue-router-middleware-plugin
```

Install using Yarn

```bash
yarn add vue-router-middleware-plugin
```

## Get Started in 3 Easy Steps

1. Register middleware plugin in your app.

    ```javascript
    import Vue from 'vue'
    import MiddlewarePlugin from 'vue-router-middleware-plugin'
    import router from '@/path-to-router'

    Vue.use(MiddlewarePlugin, router)
    ```

2. Create a middleware function.

    ```javascript
    import store from '@/path-to-store'

    export default ({ to, from, redirect }) => {
      if (!store.getters.isLoggedIn) {
        redirect('/login')
      }
    }
    ```

3. Attach middleware to a route.

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
    ```

Note: You may attach multiple middlewares to a route.

```javascript
  {
    path: '/login',
    meta: {
      middleware: [LoggerMiddleware, AnalyticsMiddleware]
    },
    .
    .
  },
```

Easy as that to get started.

:eyes: For advanced features like global middlewares and
middleware context continue to [Documentations](https://vue-router-middleware-plugin.netlify.com/).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss
what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
