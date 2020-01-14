# vue-router-middleware-plugin

[![npm version](https://badge.fury.io/js/vue-router-middleware-plugin.svg)](https://badge.fury.io/js/vue-router-middleware-plugin) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d1ab723bcfaa460aa9d12ccc7a54bf65)](https://www.codacy.com/manual/dsfx3d/vue-router-middleware-plugin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dsfx3d/vue-router-middleware-plugin&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/dsfx3d/vue-router-middleware-plugin.svg?branch=master)](https://travis-ci.org/dsfx3d/vue-router-middleware-plugin)

> **Please Note:** Due to the very limited scope of this module, I do not anticipate needing to make very many changes to it.  Expect long stretches of zero updates—that does not mean that the module is outdated.

A vue.js plugin to implement a middleware pipeline between your routes.

It can be utilized for many use cases like protecting a route or to request an API to populate the store before a route is loaded.
The plugin utilizes [vue-router navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) to implement easy to use, readable and more organized middlewares for your routes.

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

Register the plugin in your application.

```javascript
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
/* vue-router is required */
import router from '~/router'

Vue.use(MiddlewarePlugin, router)
```

Create a middleware, `auth-example.js`

```javascript
import store from '~/store'

export default ({ to, from, next }) => {
  if (store.getters.isLoggedIn) {
    next()
  } else {
    next('/login')
  }
}
```

Attach the middleware to the routes in `router.js`

```javascript
import AuthExampleMiddleware from './middlewares/auth-example'
import AnotherMiddleware from './middlewares/another'

.
.
.
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: {
      /* Attach a middleware to a route */
      middleware: AuthExampleMiddleware
    }
  },
  {
    path: '/profile',
    component: ProfileView,
    /* You can also attach multiple middlewares to a route */
    meta: {
      middleware: [AuthExampleMiddleware, AnotherMiddleware]
    }
  }
]

```

If the user tries to access `/profile` route, the attached middlewares will be resolved in a synchronous order. i.e. `AuthExampleMiddleware` will be resolved first and `AnotherMiddleware` afterwards.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
