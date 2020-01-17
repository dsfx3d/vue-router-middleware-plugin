import { BasePluginError } from './BasePluginError'

export class InvalidPipelinePayload extends BasePluginError {
  protected static readonly _MESSAGE_: string =
    'arg `middlewares` must be an array of middlewares'

  /* istanbul ignore next */
  constructor(message: string = InvalidPipelinePayload._MESSAGE_) {
    super(message)
  }
}
