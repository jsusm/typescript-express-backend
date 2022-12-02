import { LessonController } from './controllers/LessonController.js'

/**
 * All application routes.
 */
export const Routes = [
  {
    route: "/lessons",
    method: "get",
    middlewares: [],
    controller: LessonController,
    action: 'all'
  },
  {
    route: "/lessons/:id",
    method: "get",
    middlewares: [],
    controller: LessonController,
    action: 'findOne'
  }
]
