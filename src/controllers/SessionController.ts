import { sessionDTO } from "../contracts/session.js";
import { CRUDController } from './genericController.js'

export class SessionController extends CRUDController<typeof sessionDTO> {
  schema = sessionDTO
}
