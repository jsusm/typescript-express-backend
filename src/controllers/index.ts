import {Router, RequestHandler, NextFunction, Request, Response} from 'express'
import { LessonService } from '../services/lesson.service.js'
import {LessonController} from './LessonController.js'

export interface Controller {
  loadRoutes(): Router
}

export function loadControllers(): Router {
  const router = Router()
  const lessonRepository = new LessonService()
  router.use('/lessons', new LessonController(lessonRepository).router)
  return router
}
