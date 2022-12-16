import { studentDTO } from "../contracts/student.js";
import { CRUDController } from './genericController.js'

export class StudentController extends CRUDController<typeof studentDTO.shape, typeof studentDTO> {
  schema = studentDTO
  path = "/students"
}
