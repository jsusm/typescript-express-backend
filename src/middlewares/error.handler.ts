import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ControllerError } from '../errors/ControllerError.js'
import { ServiceError } from "../errors/ServiceError.js";

export function joiErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if((err as any).isJoi) {
    res.status(404).send({
      status: 404,
      message: err.message
    })
    return
  }
  next(err)
}
export function zodErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err instanceof ZodError){
    let msg = 'Validation error:'
    for(let i = 0; i < err.issues.length; i++) {
      const issue = err.issues[i]
      const endChar = i === err.issues.length - 1 ? '.' : ';'
      msg = msg.concat(` ${issue.message} at "${issue.path.join('.')}"`, endChar)
    }
    res.status(400).json({ error: msg })
    return
  }
  next(err)
}

export function controllerErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err instanceof ControllerError){
    res.status(err.status).send({
      status: err.status,
      message: err.message,
    })
    return
  }
  next(err)
}

export function serviceErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err instanceof ServiceError){
    res.status(err.status).send({
      status: err.status,
      message: err.message,
    })
    return
  }
  next(err)
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
  res.status(500)
  res.json({
    message: err.message,
    stack: err.stack,
  })
}
