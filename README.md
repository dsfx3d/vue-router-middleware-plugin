# vue-router-middleware-plugin

A vue.js plugin to implement a middleware pipeline for vue-router.

[![npm version](https://badge.fury.io/js/vue-router-middleware-plugin.svg)](https://badge.fury.io/js/vue-router-middleware-plugin)
[![Build Status](https://travis-ci.org/dsfx3d/vue-router-middleware-plugin.svg?branch=master)](https://travis-ci.org/dsfx3d/vue-router-middleware-plugin)
[![code cove](https://codecov.io/gh/dsfx3d/vue-router-middleware-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/dsfx3d/vue-router-middleware-plugin/branch/master/graph/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d1ab723bcfaa460aa9d12ccc7a54bf65)](https://www.codacy.com/manual/dsfx3d/vue-router-middleware-plugin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dsfx3d/vue-router-middleware-plugin&amp;utm_campaign=Badge_Grade)
![vue-router-middleware-plugin](https://badgen.net/bundlephobia/minzip/vue-router-middleware-plugin)

> **Important:** Global middlewares are not working as expected. Please ignore using global middlewares. The fix will be published in next release. If you are interested in global middlewares please watch the respository on github to be notified about the fix.

It can have many use cases like protecting a route or to request an API to populate the store before a route is loaded.
The plugin utilizes [vue-router navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) to implement easy to use, readable and more organized middlewares for your routes.

> **Please Note:** Due to the very limited scope of this module, I do not anticipate need to making many changes to it.  Expect long stretches of zero updates—that does not mean that the module is outdated.

## Installation

Install using NPM

```bash
npm i -S vue-router-middleware-plugin
```

Install using Yarn

```bash
yarn add vue-router-middleware-plugin
```

## Usage

Create a middleware, `auth.js`

```javascript
import store from '~/store'

export default ({ to, from, redirect }) => {
  if (!store.getters.isLoggedIn) {
    redirect('/login')
    // or
    redirect(from)
    // or
    redirect(false)
  }
}
```

> **Note:** Properties `to` and `from` are the same as in a vue router navigation gaurds. In __v2.0.0__  functin `next` has been replaced by `redirect` which can be called to redirect to a route. Now, there's no need to call `next` in each middleware to resolve it.

Register the plugin in your application.

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '~/router'
import AuthMiddleware from '~router/middlewares/auth'
import LoggerMiddleware from '~router/middlewares/logger'

Vue.use(MiddlewarePlugin, router)

// register a globabl middleware
Vue.use(MiddlewarePlugin, { router, middleware: AuthMiddleware })

// register multiple globabl middlewares
Vue.use(MiddlewarePlugin, {
  router,
  middleware: [AuthMiddleware, LoggerMiddleware]
})
```

> **Note:**: As the name suggests a global middleware will be resolved before each route.

Attach route middlewares in `router.js`

```javascript
import ExampleMiddleware from './middlewares/example'
import AnotherMiddleware from './middlewares/another'

.
.
.
const routes = [
  {
    path: '/dashboard',
    component: DashboardView,
    meta: {
      // attavh a middleware to a route
      middleware: ExampleMiddleware
    }
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: {
      // you may also use an array for multiple middlewares
      middleware: [ExampleMiddleware, AnotherMiddleware]
    }
  },
  .
  .
  .
]
```

> **Note**: Global middlewares have precedence over route middlewares

If the user tries to access `/profile` route, the attached middlewares will be resolved in a synchronous order:

```bash
AuthMiddleware > LoggerMiddleware > ExampleMiddleware > AnotherMiddleware
```

`AuthMiddleware` and `LoggerMiddleware` will be resolved before profile route middlewares because they are global middlewares.

Ignore global middlewares in `router.js`

```javascript
import AuthMiddleware from './middlewares/auth'
import LoggerMiddleware from './middlewares/logger'
import ExampleMiddleware from './middlewares/example'
import AnotherMiddleware from './middlewares/another'

.
.
.
const routes = [
  .
  .
  .
  {
    path: '/login',
    component: LoginView,
    meta: {
      middleware: {
        ignore: AuthMiddleware
      }
    }
  },
  {
    path: '/register',
    component: RegisterView,
    meta: {
      // you may also attach a middleware to this route
      middleware: {
        ignore: AuthMiddleware
        attach: AnotherMiddleware
      }
    }
  },

  {
    path: '/about',
    component: AboutView,
    meta: {
      // you may also use an array for multiple middlewares
      middleware: {
        ignore: [AuthMiddleware, LoggerMiddleware]
        attach: [ExampleMiddleware, AnotherMiddleware]
      }
    }
  }
]
```

### New features

#### v1.2.0: Custom Middleware properties

You can now pass custom properties in plugin option `context` which will be accessible to the middleware.

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '~/router'
import store from '~/store'

Vue.use(MiddlewarePlugin, {
  router,
  // context must be an object
  context: {
    version: process.env.VERSION
  }
})
```

In any middleware, `version` will be added to context

```javascript
export default ({ version }) => {
  console.log('version:', version)
}
```

#### v2.0.0: New property in middleware context

* Middlewares don't need to be resolved by calling `next`.
* A new function `redirect`, added to the middleware context.
* **Breaking Change:** Function `next` removed from middleware context.

## Roadmap

* [x] **v1.0.0** - Route Middlewares.
* [x] **v1.1.0** - Global Middlewares.
* [x] **v1.2.0** - Middleware context - custom properties.
* [x] **v2.0.0** - Middleware Pipeline (rebuild).
* [ ] **TBD** - Auto importing middlewares.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
