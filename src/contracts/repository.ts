export interface Repository<T> {
  find(): Promise<T[]>
  findOne(id: number): Promise<T>
  create(data: T): Promise<T>
  update(id: number, data: Partial<T>): Promise<void>
  delete(id: number): Promise<void>
}
