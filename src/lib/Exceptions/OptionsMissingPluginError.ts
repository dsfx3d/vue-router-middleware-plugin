import { BasePluginError } from './BasePluginError'

export class OptionsMissingPluginError extends BasePluginError {
  protected static readonly _MESSAGE_: string = 'missing plugin options'

  /* istanbul ignore next */
  constructor(message: string = OptionsMissingPluginError._MESSAGE_) {
    super(message)
  }
}
