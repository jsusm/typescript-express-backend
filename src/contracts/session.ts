import { z } from 'zod'
import { Repository } from './repository.js'

export const sessionId = z.coerce.number().int()
export const sessionDTO = z.object({
  id: sessionId.optional(),
  date: z.preprocess((arg) => {
    if(typeof arg === "string" || arg instanceof Date) return new Date(arg)
  }, z.date()),
  attended: z.boolean().default(false)
})

export type SessionDTO = z.infer<typeof sessionDTO>

export type SessionRepository = Repository<SessionDTO>
