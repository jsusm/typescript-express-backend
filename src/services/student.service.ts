import { StudentDTO, StudentRepository } from "../contracts/student.js";
import { AppDataSource } from "../db/data-source.js";
import { Student } from "../db/entity/Student.js";
import { serviceErr } from "../errors/ServiceError.js";

export class StudentService implements StudentRepository {
  private repository = AppDataSource.getRepository(Student)

  async create(data: StudentDTO): Promise<StudentDTO> {
    const newStudent = await this.repository.save(data)
    return newStudent
  }

  async find(limit?: number, offset?:number): Promise<StudentDTO[]> {
    const students = await this.repository.find({
      skip: offset,
      take: limit,
      order: {
        id: "DESC",
      }
    })
    return students
  }
  async findOne(id: number): Promise<StudentDTO> {
    const student = await this.repository.findOneBy({id})
    if(!student) {
      throw serviceErr(404, "Student not found.")
    }
    return student
  }
  async update(id: number, data: StudentDTO) {
    await this.findOne(id)
    await this.repository.update(id, data)
  }
  async delete(id: number): Promise<void> {
    await this.findOne(id)
    await this.repository.delete(id)
  }
}
