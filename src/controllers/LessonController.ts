import { Request, Response, Router } from "express";
import { LessonRepository } from "../contracts/lesson.js";
import { controllerErr } from '../errors/ControllerError.js'
import { Time } from '../lib/time.js'
import { lessonDTO, lessonId } from '../contracts/lesson.js'

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
  public router = Router()

  constructor(repository: LessonRepository) {
    this.repository = repository
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/', this.all)
    this.router.get('/:id', this.findOne)
    this.router.post('/', this.create)
    this.router.post('/:id', this.update)
    this.router.delete('/:id', this.delete)
  }

  all = async (req: Request, res: Response) => {
    res.send(await this.repository.find())
  }

  findOne = async (req: Request, res: Response) => {
    const id = lessonId.parse(req.params.id)
    const lesson = await this.repository.findOne(id)
    res.send(lesson)
  }

  create = async (req: Request, res: Response) => {
    const data = lessonDTO.parse(req.body)
    timeValidator(data.startTime, data.endTime)
    const newLesson = await this.repository.create(data)
    res.sendStatus(201).send(newLesson)
  }

  update = async (req: Request, res: Response) => {
    const id = lessonId.parse(req.params.id)
    const data = lessonDTO.parse(req.body)
    timeValidator(data.startTime, data.endTime)
    await this.repository.update(id, data)
    res.sendStatus(200)
  }

  delete = async (req: Request, res: Response) => {
    const id = lessonId.parse(req.params.id)
    await this.repository.delete(id)
    res.sendStatus(200)
  }
}
