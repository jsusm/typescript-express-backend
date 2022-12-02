import { AppDataSource } from '../data-source.js'
import type { Request, Response, NextFunction } from "express";
import { Lesson } from "../entity/Lesson.js";
import { controllerErr } from '../errors/ControllerError.js'

export class LessonController {
  private repository = AppDataSource.getRepository(Lesson)

  async all(req: Request, res: Response, next: NextFunction) {
    return this.repository.find()
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    throw controllerErr(404, "Lesson not found")

    return this.repository.findOneBy({
      id: parseInt(req.params.id)
    })
  }
}
