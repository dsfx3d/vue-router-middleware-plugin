/* istanbul ignore file */

export class BasePluginError extends Error {
  protected static readonly _MESSAGE_: string = 'unexpected error'
  protected static readonly _NAME_: string = '[better-vue-router-middleware]'

  constructor(message: string = BasePluginError._MESSAGE_) {
    super(message)
    this.message = message
    this.name = BasePluginError._NAME_
  }
}
