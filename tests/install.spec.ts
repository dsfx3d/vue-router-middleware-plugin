//
import { install } from '../src/install'
import { BasePluginError } from '../src/lib/Exceptions/BasePluginError'
import { OptionsMissingPluginError } from '../src/lib/Exceptions/OptionsMissingPluginError'
import { PluginOptions } from '../src/types/PluginTypes'
import { Router, Vue } from '../src/types/VueTypes'
import { expectErrorClass, VueRouter } from '../src/utils/testUtils'

describe('installation checks', () => {
  const dummyVue: Vue = {}

  it("raises 'OptionMissingPluginError' if plugin options not passed", () => {
    expectErrorClass(() => install(dummyVue), OptionsMissingPluginError)
  })

  it('accepts router as plugin option', () => {
    const router: Router = new VueRouter()
    install(dummyVue, router)
  })

  it('accepts options object as plugin option', () => {
    const router: Router = new VueRouter()
    const pluginOptions: PluginOptions = { router }
    install(dummyVue, pluginOptions)
  })

  it('raises exception if invalid context provided in plugin options', () => {
    const router: Router = new VueRouter()
    const pluginOptions: PluginOptions = ({
      context: 1,
      router
    } as unknown) as PluginOptions
    expectErrorClass(() => install(dummyVue, pluginOptions), BasePluginError)
  })
})
