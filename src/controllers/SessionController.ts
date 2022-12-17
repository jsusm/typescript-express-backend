import { sessionDTO } from "../contracts/session.js";
import { CRUDController } from './genericController.js'

export class SessionController extends CRUDController<typeof sessionDTO.shape, typeof sessionDTO> {
  schema = sessionDTO
}
