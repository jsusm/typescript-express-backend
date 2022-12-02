import { AppDataSource } from '../data-source.js'
import type { Request, Response, NextFunction } from "express";
import { Lesson } from "../entity/Lesson.js";

export class LessonController {
  private repository = AppDataSource.getRepository(Lesson)

  async all(req: Request, res: Response, next: NextFunction) {
    return this.repository.find()
  }
}
