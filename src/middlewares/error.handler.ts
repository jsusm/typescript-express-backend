import { Request, Response, NextFunction } from "express";
import { ControllerError } from '../errors/ControllerError.js'

export function controllerError(err: Error, req: Request, res: Response, next: NextFunction) {
  if(err instanceof ControllerError){
    res.status(err.status)
    res.send(err.message)
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
