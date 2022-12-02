import { LessonController } from './controllers/LessonController.js'

/**
 * All application routes.
 */
export const Routes = [
  {
    route: "/",
    method: "get",
    middlewares: [],
    controller: LessonController,
    action: 'all'
  }
]
