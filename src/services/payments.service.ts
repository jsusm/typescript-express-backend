import { PaymentDTO, PaymentRepository } from "../contracts/payment.js";
import { AppDataSource } from "../db/data-source.js";
import { Payment } from "../db/entity/Payment.js";
import { serviceErr } from "../errors/ServiceError.js";

export class PaymentService implements PaymentRepository {
  repository = AppDataSource.getRepository(Payment)

  async find(limit?: number, offset?:number): Promise<PaymentDTO[]> {
    return await this.repository.find({
      skip: offset,
      take: limit,
      order: {
        id: "DESC",
      }
    })
  }
  async findOne(id: number): Promise<PaymentDTO> {
    const lesson = await this.repository.findOneBy({id})
    if(!lesson) {
      throw serviceErr(404, "Lesson not found")
    }
    return lesson
  }
  async create(data: PaymentDTO): Promise<PaymentDTO> {
    const newLesson = this.repository.save(data)
    return newLesson
  }
  async update(id: number, data: PaymentDTO) {
    await this.findOne(id)  
    await this.repository.update(id, data)
  }
  async delete(id: number) {
    await this.findOne(id)
    await this.repository.delete(id)
  }
}
