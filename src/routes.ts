import { LessonController } from './controllers/LessonController.js'
import { StudentController } from './controllers/StudentController.js'
import { schemaValidator } from './middlewares/validator.handler.js'
import { getLessonSchema, createLessonSchema, updateLessonSchema } from './schemes/lesson.scheme.js'
import { getStudentSchema, createStudentSchema, updateStudentSchema } from './schemes/student.scheme.js'

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
  },
  {
    route: "/lessons",
    method: "post",
    middlewares: [schemaValidator(createLessonSchema, 'body')],
    controller: LessonController,
    action: 'create'
  },
  {
    route: '/lessons/:id',
    method: "patch",
    middlewares: [schemaValidator(getLessonSchema, 'params'), schemaValidator(updateLessonSchema, 'body')],
    controller: LessonController,
    action: 'update'
  },
  {
    route: '/lessons/:id',
    method: "delete",
    middlewares: [schemaValidator(getLessonSchema, 'params')],
    controller: LessonController,
    action: 'delete'
  },
  {
    route: '/students',
    method: "get",
    middlewares: [],
    controller: StudentController,
    action: 'all',
  },
  {
    route: '/students/:id',
    method: "get",
    middlewares: [schemaValidator(getStudentSchema, 'params')],
    controller: StudentController,
    action: 'findOne',
  },
  {
    route: '/students',
    method: "post",
    middlewares: [schemaValidator(createStudentSchema, 'body')],
    controller: StudentController,
    action: 'create',
  },
  {
    route: '/students/:id',
    method: "patch",
    middlewares: [
      schemaValidator(getStudentSchema, 'params'),
      schemaValidator(updateStudentSchema, 'body')
    ],
    controller: StudentController,
    action: 'update',
  },
  {
    route: '/students/:id',
    method: "delete",
    middlewares: [schemaValidator(getStudentSchema, 'params')],
    controller: StudentController,
    action: 'delete',
  },
]
