import { BasePluginError } from './BasePluginError'

export class NotAMiddleware extends BasePluginError {
  protected static readonly _MESSAGE_: string = 'not a middlewares'

  /* istanbul ignore next */
  constructor(message: string = NotAMiddleware._MESSAGE_) {
    super(message)
  }
}
