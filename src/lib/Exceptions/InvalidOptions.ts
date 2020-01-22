import { BasePluginError } from './BasePluginError'

export class InvalidOptions extends BasePluginError {
  protected static readonly _MESSAGE_: string = 'invalid plugin options'

  /* istanbul ignore next */
  constructor(message: string = BasePluginError._MESSAGE_) {
    super(message)
  }
}
