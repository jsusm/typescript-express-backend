import { Request, Response, Router } from "express";
import { LessonRepository } from "../contracts/lesson.js";
import { controllerErr } from '../errors/ControllerError.js'
import { Time } from '../lib/time.js'
import { lessonDTO, lessonId } from '../contracts/lesson.js'

export class LessonController {
  private repository: LessonRepository
  constructor(repository: LessonRepository) {
    this.repository = repository
  }
  loadRoutes(): Router {
    const router = Router()
    router.get('/', this.all)
    router.get('/:id', this.findOne)
    router.post('/', this.create)
    router.patch('/:id', this.update)
    router.delete('/:id', this.delete)
    return router
  }
  timeValidator(startTime: string, endTime: string){
    let start: Time
    let end: Time
    try {
      start = new Time(startTime)
      end = new Time(endTime)
    } catch (error) {
      throw controllerErr(400, 'startTime or endTime have invalid formats.')      
    }
    if(!start.isBefore(end)){
      throw controllerErr(400, 'starttime must be before endTime')
    }
    return {startTime: start, endTime: end}
  }
  async all(req: Request, res: Response) {
    res.send(await this.repository.find())
  }
  async findOne(req: Request, res: Response) {
    const id = lessonId.parse(req.params.id)
    const lesson = await this.repository.findOne(id)
    res.send(lesson)
  }
  async create(req: Request, res: Response) {
    const data = lessonDTO.parse(req.body)
    this.timeValidator(data.startTime, data.endTime)
    const newLesson = await this.repository.create(data)
    res.sendStatus(201).send(newLesson)
  }
  async update(req: Request, res: Response){
    const id = lessonId.parse(req.params.id)
    const data = lessonDTO.parse(req.body)
    this.timeValidator(data.startTime, data.endTime)
    await this.repository.update(id, data)
    res.sendStatus(200)
  }
  async delete(req: Request, res: Response){
    const id = lessonId.parse(req.params.id)
    await this.repository.delete(id)
    res.sendStatus(200)
  }
}
