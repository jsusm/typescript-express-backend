import { z } from 'zod'

const timeFormatRegex = /(\d{2}):(\d{2}):(\d{2})$/
export const lessonId = z.number().int()
export const lessonDTO = z.object({
  id: lessonId.optional(),
  title: z.string(),
  price: z.number().int(),
  active: z.boolean().default(true),
  startTime: z.string().regex(timeFormatRegex),
  endTime: z.string().regex(timeFormatRegex),
})

export type LessonDTO = z.infer<typeof lessonDTO>

export interface LessonRepository {
  find(): Promise<LessonDTO[]>
  findOne(id: number): Promise<LessonDTO>
  create(data: LessonDTO): Promise<LessonDTO>
  update(id: number, data: Partial<LessonDTO>): Promise<void>
  delete(id: number): Promise<void>
}
