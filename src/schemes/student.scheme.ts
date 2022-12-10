import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(2).max(100)
const lastName = Joi.string().min(2).max(100)
const contactNumber = Joi.string().max(30)
const bornDate = Joi.date()
const studyLevel = Joi.string().max(200)

export const getStudentSchema = Joi.object({
  id: id.required(),
})

export const createStudentSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  contactNumber: contactNumber.required(),
  bornDate: bornDate.required(),
  studyLevel: studyLevel.required(),
})

export const updateStudentSchema = Joi.object({
  name,
  lastName,
  contactNumber,
  bornDate,
  studyLevel,
}) 
