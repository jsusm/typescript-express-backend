import { z } from 'zod'
import { Repository } from './repository.js'

export const paymentId = z.coerce.number().int()
export const paymentDTO = z.object({
  id: paymentId.optional(),
  reference: z.string().max(220),
  at: z.preprocess((arg) => {
    if(typeof arg === "string" || arg instanceof Date) return new Date(arg)
  }, z.date()),
})

export type PaymentDTO = z.infer<typeof paymentDTO>

export type PaymentRepository = Repository<PaymentDTO>
