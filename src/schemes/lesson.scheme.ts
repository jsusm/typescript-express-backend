import Joi from 'joi'

const id = Joi.number().integer()
const title = Joi.string().max(100).min(5)
const timeFormatRegex = /(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)/
const startTime = Joi.string().regex(timeFormatRegex)
const endTime = Joi.string().regex(timeFormatRegex)
const price = Joi.number().integer().min(100)
const active = Joi.boolean().default(true)

export const getLessonSchema = Joi.object({
  id: id.required()
})

export const createLessonSchema = Joi.object({
  title: title.required(),
  startTime: startTime.required(),
  endTime: endTime.required(),
  price: price.required(),
  active,
})

export const updateLessonSchema = Joi.object({
  title,
  startTime,
  endTime,
  price,
  active,
})

export type updateLessonType = {
  title: string,
  startTime: string,
  endTime: string,
  price: number,
  active: boolean,
}
