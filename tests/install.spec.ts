//
import { install } from '../src/install'
// exceptions
import { OptionsMissingPluginError } from '../src/lib/Exceptions/OptionsMissingPluginError'
// types
import { Vue } from '../src/types/VueTypes'
// test utils
import { expectErrorClass } from '../utils/testUtils'

describe('installation checks', () => {
  const dummyVue: Vue = {}

  it("raises 'OptionMissingPluginError' if router is passed as option", () => {
    expectErrorClass(() => install(dummyVue), OptionsMissingPluginError)
  })
})
