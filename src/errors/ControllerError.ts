export type ControllerErrorOptions = {
  status: number,
}

export class ControllerError implements Error {
  constructor(message: string | Error, options?: ControllerErrorOptions){
    if(typeof message === "string") {
      this.message = message
    }else if(message instanceof Error) {
      this.message = message.message
      this.stack = message.stack
    }
    this.name = "ControllerError"
    this.status = options.status ?? 500
  }
  name: string
  stack?: string
  message: string
  status: number
}

export function controllerErr(status: number, message: string) {
  return new ControllerError(message, { status })
}
