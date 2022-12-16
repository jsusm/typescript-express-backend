import { Request, Response } from "express";
import { z, ZodObject, ZodRawShape, ZodSchema, ZodTypeAny, objectInputType, objectOutputType, RawCreateParams, objectUtil } from "zod";
import { Repository } from '../contracts/repository.js'
import { createRoute } from "./index.js";

export abstract class CRUDController<
  Shape extends ZodRawShape,
  Schema extends ZodObject<Shape, "strip", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof Shape]: Shape[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof Shape]: Shape[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof Shape]: Shape[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof Shape]: Shape[k_2]["_input"]; }>[k_3]; }>
>{
  abstract schema: Schema
  repository: Repository<z.output<Schema>>
  abstract path: string
  idParser = z.coerce.number().int()
  constructor(repository: Repository<z.output<Schema>>) {
    this.repository = repository
  }
  getRoutes() {
    // TODO: convert routes array to map
    return [
      createRoute("get", "/", this.read),
      createRoute("get", "/:id", this.readOne),
      createRoute("post", "/", this.create),
      createRoute("patch", "/:id", this.update),
      createRoute("delete", "/:id", this.delete),
    ]
  }
  /**
   * Returns all instances of the model 
   */
  async read(req: Request, res: Response) {
    return this.repository.find()
  }
  /**
   * Returns an instance of the model by 
   * the identifier specified in the url parameter
   */
  async readOne(req: Request, res: Response) {
    const id = this.idParser.parse(req.params.id)
    return this.repository.findOne(id)
  }
  /**
   * Create an instance of the model
   */
  async create(req: Request, res: Response) {
    const data = this.schema.parse(req.body)
    const instance = this.repository.create(data)
    res.status(201)
    return instance
  }
  /**
   * Update an instance of the model
   */
  async update(req: Request, res: Response) {
    const id = this.idParser.parse(req.params.id)
    const data = this.schema.partial().parse(req.body)
    this.repository.update(id, data)
    res.sendStatus(200)
  }
  /**
   * Deletes an instance of the model
   */
  async delete(req: Request, res: Response) {
    const id = this.idParser.parse(req.params.id)
    this.repository.delete(id)
    res.sendStatus(200)
  }
}
