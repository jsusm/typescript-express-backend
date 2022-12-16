import { Request, Response } from "express";
import { controllerErr } from '../errors/ControllerError.js'
import { Time } from '../lib/time.js'
import { lessonDTO } from '../contracts/lesson.js'
import { CRUDController } from './genericController.js'

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

export class LessonController extends CRUDController<typeof lessonDTO.shape, typeof lessonDTO> {
  schema = lessonDTO
  path = '/lessons'

  async create(req: Request, res: Response) {
    const data = lessonDTO.parse(req.body)
    timeValidator(data.startTime, data.endTime)
    return super.create(req, res)
  }

  async update(req: Request, res: Response) {
    const data = lessonDTO.partial().parse(req.body)
    if(data.startTime && data.endTime) {
      timeValidator(data.startTime, data.endTime)
    }
    return super.update(req, res)
  }
}
