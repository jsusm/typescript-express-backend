import { LessonController } from './controllers/LessonController.js'
import { schemaValidator } from './middlewares/validator.handler.js'
import { getLessonSchema } from './schemes/lesson.scheme.js'

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
    middlewares: [schemaValidator(getLessonSchema, 'params')],
    controller: LessonController,
    action: 'findOne'
  }
]
