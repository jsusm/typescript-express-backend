import { z } from 'zod'

const studentId = z.coerce.number().int()
export const studentDTO = z.object({
  id: studentId.optional(),
  name: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  contactNumber: z.string().min(7).max(30),
  bornDate: z.preprocess((arg) => {
    if(typeof arg === "string" || arg instanceof Date) return new Date(arg)
  }, z.date()),
  studyLevel: z.string().max(200),
})

export type StudentDTO = z.infer<typeof studentDTO>

export interface StudentRepository {
  find(): Promise<StudentDTO[]>
  findOne(id: number): Promise<StudentDTO>
  create(data: StudentDTO): Promise<StudentDTO>
  update(id: number, data: Partial<StudentDTO>): Promise<void>
  delete(id: number): Promise<void>
}

