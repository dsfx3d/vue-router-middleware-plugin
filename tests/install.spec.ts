//
import { install } from '../src/install'
// exceptions
import { OptionsMissingPluginError } from '../src/lib/Exceptions/OptionsMissingPluginError'
import { PluginOptions } from '../src/types/PluginTypes'
// types
import { Router, Vue } from '../src/types/VueTypes'
// test utils
import { expectErrorClass, VueRouter } from '../src/utils/testUtils'

describe('installation checks', () => {
  const dummyVue: Vue = {}

  it("raises 'OptionMissingPluginError' if plugin options not passed", () => {
    expectErrorClass(() => install(dummyVue), OptionsMissingPluginError)
  })

  const router: Router = new VueRouter()
  it('accepts router as plugin option', () => {
    install(dummyVue, router)
  })

  const pluginOptions: PluginOptions = { router }
  it('accepts options object as plugin option', () => {
    install(dummyVue, pluginOptions)
  })
})
