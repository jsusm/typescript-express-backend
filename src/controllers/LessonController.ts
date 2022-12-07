import { AppDataSource } from '../data-source.js'
import type { Request, Response, NextFunction } from "express";
import { Lesson } from "../entity/Lesson.js";
import { controllerErr } from '../errors/ControllerError.js'
import { timeStringToDate, isBefore  } from '../lib/time.js'
import { updateLessonType } from '../schemes/lesson.scheme.js'

export class LessonController {
  private repository = AppDataSource.getRepository(Lesson)

  async all(req: Request, res: Response, next: NextFunction) {
    return this.repository.find()
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    return this.repository.findOneBy({})
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as updateLessonType
    const startTime = timeStringToDate(data.startTime)
    const endTime = timeStringToDate(data.endTime)
    console.log(startTime)
    console.log(endTime)
    if(!isBefore(startTime, endTime)){
      throw controllerErr(404, 'startTime must be before endTime.')
    }

    const rta = this.repository.create(data)
    res.status(201)
    return rta
  }
}
