import { Request, Response } from "express";
import { studentDTO, studentId, StudentRepository } from "../contracts/student.js";
import { createRoute } from "./index.js";

export class StudentController {
  repository: StudentRepository
  constructor(repository: StudentRepository){
    this.repository = repository
  }
  getRoutes() {
    return [
      createRoute("get", '/', this.all),
      createRoute("get", '/:id', this.findOne),
      createRoute("post", '/', this.create),
      createRoute("patch", '/:id', this.update),
      createRoute("delete", '/:id', this.delete),
    ]
  }
  async all(req: Request, res: Response) {
    return await this.repository.find()
  }
  async findOne(req: Request, res: Response) {
    const id = studentId.parse(req.params.id)
    return await this.repository.findOne(id)
  }
  async update(req: Request, res: Response) {
    const id = studentId.parse(req.params.id)
    const data = studentDTO.parse(req.body)
    await this.repository.update(id, data)
    res.sendStatus(200)
  }
  async create(req: Request, res: Response) {
    const data = studentDTO.parse(req.body)
    const newStudent = await this.repository.create(data)
    res.status(201)
    return newStudent
  }
  async delete(req: Request, res: Response) {
    const id = studentId.parse(req.params.id)
    await this.repository.delete(id)
    res.sendStatus(200)
  }
}
