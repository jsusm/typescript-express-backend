import { NextFunction, Request, Response } from "express";
import { LessonRepository } from "../contracts/lesson.js";
import { controllerErr } from '../errors/ControllerError.js'
import { Time } from '../lib/time.js'
import { lessonDTO, lessonId } from '../contracts/lesson.js'
import { createRoute, Route } from './index.js'

function timeValidator(startTime: string, endTime: string){
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

export class LessonController {
  private repository: LessonRepository
  public path = "/lessons"

  constructor(repository: LessonRepository) {
    this.repository = repository
  }

  getRoutes(): Route[]{
    return [
      createRoute("get", "/", this.all ),
      createRoute("get", "/:id", this.findOne ),
      createRoute("post", "/", this.create ),
      createRoute("patch", "/:id", this.update ),
      createRoute("delete", "/:id", this.delete ),
    ]
  }

  async all(req: Request, res: Response) {
    return this.repository.find()
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = lessonId.parse(req.params.id)
    const lesson = await this.repository.findOne(id)
    return lesson
  }

  async create(req: Request, res: Response) {
    const data = lessonDTO.parse(req.body)
    timeValidator(data.startTime, data.endTime)
    const newLesson = await this.repository.create(data)
    res.sendStatus(201).send(newLesson)
  }

  async update(req: Request, res: Response) {
    const id = lessonId.parse(req.params.id)
    const data = lessonDTO.parse(req.body)
    timeValidator(data.startTime, data.endTime)
    await this.repository.update(id, data)
  }

  async delete(req: Request, res: Response) {
    const id = lessonId.parse(req.params.id)
    await this.repository.delete(id)
  }
}
