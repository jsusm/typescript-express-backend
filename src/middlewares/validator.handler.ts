import { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

export function schemaValidator(schema: Schema, property: "body" | "params" | "query") {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if(error) {
      next(error)
    }
    next()
  }
}
