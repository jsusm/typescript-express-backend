import { DeepPartial } from "typeorm";
import { AppDataSource } from "../db/data-source.js";
import { Lesson } from "../db/entity/Lesson.js";
import { serviceErr } from "../errors/ServiceError.js";

export class LessonService {
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
  async create(data: DeepPartial<Lesson>) {
    const lesson = await this.repository.save(data)
    return lesson
  }
  async update(id: number, data: DeepPartial<Lesson>){
    const lesson = await this.findOne(id)
    const reply = await this.repository.update(lesson.id, data)
    return reply
  }
  async delete(id: number) {
    const lesson = await this.findOne(id)
    const reply = await this.repository.delete(lesson)
    return reply
  }
}
