import { Request, Response } from "express";
import { paymentDTO, paymentId, PaymentRepository } from "../contracts/payment.js";
import { createRoute } from "./index.js";

export class PaymentController {
  repository: PaymentRepository
  constructor(repository: PaymentRepository){
    this.repository = repository
  }

  getRoutes() {
    return [
      createRoute("get", "/", this.all),
      createRoute("get", "/:id", this.findOne),
      createRoute("post", "/", this.create),
      createRoute("patch", "/:id", this.update),
      createRoute("delete", "/:id", this.delete),
    ]
  }

  async all(req: Request, res: Response) {
    return this.repository.find()
  }
  async findOne(req: Request, res: Response) {
    const id = paymentId.parse(req.params.id)
    return this.repository.findOne(id)
  }
  async create(req: Request, res: Response) {
    const data = paymentDTO.parse(req.body)
    return this.repository.create(data)
  }
  async update(req: Request, res: Response) {
    const id = paymentId.parse(req.params.id)
    const data = paymentDTO.partial().parse(req.body)
    await this.repository.update(id, data)
    res.send(200)
  }
  async delete(req: Request, res: Response) {
    const id = paymentId.parse(req.params.id)
    await this.repository.delete(id)
    res.send(200)
  }
}
