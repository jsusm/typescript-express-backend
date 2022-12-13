import { AppDataSource } from "../db/data-source.js";
import { Lesson } from "../db/entity/Lesson.js";
import { serviceErr } from "../errors/ServiceError.js";
import { LessonDTO, LessonRepository } from '../contracts/lesson.js'

export class LessonService implements LessonRepository {
  private repository = AppDataSource.getRepository(Lesson)

  async find() {
    const lessons = await this.repository.find()
    return lessons
  }
  async findOne(id: number){
    const lesson = await this.repository.findOneBy({id})
    if(!lesson) {
      throw serviceErr(404, "Lesson not found.")
    }
    return lesson
  }
  async create(data: LessonDTO) {
    const lesson = await this.repository.save(data)
    return lesson
  }
  async update(id: number, data: Partial<LessonDTO>){
    const lesson = await this.findOne(id)
    await this.repository.update(lesson.id, data)
  }
  async delete(id: number) {
    const lesson = await this.findOne(id)
    await this.repository.delete(lesson)
  }
}
