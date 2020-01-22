//
import { install } from '../src/install'
import { BasePluginError } from '../src/lib/Exceptions/BasePluginError'
import { InvalidOptions } from '../src/lib/Exceptions/InvalidOptions'
import { PluginOptions } from '../src/types/PluginTypes'
import { Router, Vue } from '../src/types/VueTypes'
import { expectErrorClass, VueRouter } from '../src/utils/testUtils'

describe('installation checks', () => {
  const dummyVue: Vue = {}

  it("raises 'InvalidOptions' if plugin options not passed", () => {
    expectErrorClass(() => install(dummyVue), InvalidOptions)
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

  it('raises error if router is undefined in options object', () => {
    const pluginOptions = {}
    expectErrorClass(
      () => install(dummyVue, (pluginOptions as unknown) as PluginOptions),
      InvalidOptions
    )
  })

  it('raises error if non-object passed as option', () => {
    expectErrorClass(
      () => install(dummyVue, (1 as unknown) as PluginOptions),
      InvalidOptions
    )
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

describe('middleare helper functions', () => {
  it('$MiddlewarePlugin flag is set', () => {
    const dummyVue: Vue = {}
    const router: VueRouter = new VueRouter()
    install(dummyVue, router)
    expect(dummyVue.$MiddlewarePlugin).toBeTruthy()
  })

  it('$getMiddlewareContext return custom context', () => {
    const dummyVue: Vue = {}
    const options: PluginOptions = ({
      router: new VueRouter(),
      context: { foo: 'baz' }
    } as unknown) as PluginOptions

    install(dummyVue, options)
    const context = dummyVue.$getMiddlewareContext()
    expect(context !== undefined && context !== null).toBeTruthy()
    expect(context.foo).toBe('baz')
  })

  it('$setMiddlewareContext sets custom context, not internal context', () => {
    const dummyVue: Vue = {}
    const options: PluginOptions = ({
      router: new VueRouter(),
      context: { foo: 'baz' }
    } as unknown) as PluginOptions

    install(dummyVue, options)
    dummyVue.$setMiddlewareContext({ foo: 1, app: 2 })
    const context = dummyVue.$getMiddlewareContext()
    expect(context.foo).toBe(1)
    expect(context.app === 2).toBeFalsy()
  })

  it('$updateMiddlewareContext update custom context properties', () => {
    const dummyVue: Vue = {}
    const options: PluginOptions = ({
      router: new VueRouter(),
      context: { foo: 'baz' }
    } as unknown) as PluginOptions

    install(dummyVue, options)
    dummyVue.$updateMiddlewareContext('foo', 2)
    const context = dummyVue.$getMiddlewareContext()
    expect(context.foo).toBe(2)
  })

  it('$updateMiddlewareContext throws error if internal context property is to be updated', () => {
    const dummyVue: Vue = {}
    const options: PluginOptions = ({
      router: new VueRouter(),
      context: { foo: 'baz' }
    } as unknown) as PluginOptions

    install(dummyVue, options)
    expectErrorClass(
      () => dummyVue.$updateMiddlewareContext('app', 2),
      BasePluginError
    )
    const context = dummyVue.$getMiddlewareContext()
    expect(context.app === 2).toBeFalsy()
  })
})
