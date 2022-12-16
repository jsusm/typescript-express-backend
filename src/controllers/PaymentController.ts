import { paymentDTO } from "../contracts/payment.js";
import { CRUDController } from './genericController.js'

export class PaymentController extends CRUDController<typeof paymentDTO.shape, typeof paymentDTO> {
  schema = paymentDTO
  path = '/payments'
}
