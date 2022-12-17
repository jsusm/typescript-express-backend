import { Router, NextFunction, Request, Response, RequestHandler } from 'express'
import { LessonService } from '../services/lesson.service.js'
import { StudentService } from '../services/student.service.js'
import { SessionService } from '../services/session.service.js'
import { PaymentService } from '../services/payments.service.js'
import { LessonController } from './LessonController.js'
import { StudentController } from './StudentController.js'
import { SessionController } from './SessionController.js'
import { PaymentController } from './PaymentController.js'

export const controllers: Controller[] = [
  {
    controller: new LessonController(new LessonService()),
    prefix: '/lessons',
  },
  {
    controller: new StudentController(new StudentService()),
    prefix: '/students'
  },
  {
    controller: new SessionController(new SessionService()),
    prefix: '/sessions'
  },
  {
    controller: new PaymentController(new PaymentService()),
    prefix: '/payments'
  },
]

interface ControllerInterface {
  getRoutes(): Route[]
}

type Controller = {
  controller: ControllerInterface,
  prefix: string,
}

export type Route = {
  method: string,
  path: string,
  action: string,
}

export function createRoute(method: string, path: string, action: RequestHandler): Route {
  return { method, path, action: action.name }
}

export function loadControllers(controllers: Controller[]): Router {
  const router = Router()
  for (const controller of controllers) {
    const routes = controller.controller.getRoutes()
    const r = Router()
    for (const route of routes) {
      (r as any)[route.method](route.path, async (req: Request, res: Response, next: NextFunction) => {
        const result = (controller.controller as any)[route.action](req, res, next)
        if (result instanceof Promise) {
          result
            .then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            .catch(next)
        }
        else if (result !== null && result !== undefined) {
          res.json(result)
        }
      })
    }
    router.use(controller.prefix, r)
  }
  return router
}
