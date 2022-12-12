import { AppDataSource } from '../db/data-source.js'
import type { Request, Response, NextFunction } from "express";
import { Student } from '../db/entity/Student.js';
import { controllerErr } from '../errors/ControllerError.js';

export class StudentController {
  private repository = AppDataSource.getRepository(Student)

  async all(req: Request, res: Response, next: NextFunction) {
    return this.repository.find()
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id)
    return this.repository.findBy({ id })
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const reply = await this.repository.save(data)
    res.status(201)
    return reply
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id)
    const data = req.body
    return this.repository.save({
      id,
      data,
    })
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id)
    const student = await this.repository.findOneBy({id})
    return this.repository.delete(student)
  }
}
