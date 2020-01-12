# vue-router-middleware-plugin

A vue.js plugin to implement a middleware pipeline between your routes.

It can be used to guard protected routes or to request an API to populate the store before a route is loaded.
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

```ECMA6
import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
/* vue-router is required */
import router from '~/router'

Vue.use(MiddlewarePlugin, router)
```

Create a middleware, `auth-example.js`

```ECMA6
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

```ECMA6
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
    /* You can also attach a multiple middlewares to a route */
    meta: {
      middleware: [AuthExampleMiddleware, AnotherMiddleware]
    }
  }
]

```

**Note:** In the above example,

If the user tries to access `/profile` route, the attached middlewares will be resolved synchronously in order. i.e. `AuthExampleMiddleware` will be resolved first and `AnotherMiddleware` afterward.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
