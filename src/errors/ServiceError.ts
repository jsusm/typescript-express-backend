export type ServiceErrorOptions = {
  status: number,
}

export class ServiceError implements Error {
  constructor(message: string | Error, options?: ServiceErrorOptions) {
    if (message instanceof Error) {
      this.message = message.message
      this.stack = message.stack
    } else {
      this.message = message
    }
    this.name = "ServiceError"
    this.status = options?.status ?? 500
  }
  name: string
  stack?: string
  message: string
  status: number
}

export function serviceErr(status: number, message: string) {
  return new ServiceError(message, { status })
}
