import { Request, Response, NextFunction } from "express";
import { ControllerError } from '../errors/ControllerError.js'

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

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
  res.status(500)
  res.json({
    message: err.message,
    stack: err.stack,
  })
}
