import Joi from 'joi'

const id = Joi.number().integer()

export const getLessonSchema = Joi.object({
  id: id.required()
})
