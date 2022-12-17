import { SessionDTO, SessionRepository } from "../contracts/session.js";
import { AppDataSource } from "../db/data-source.js";
import { Session } from "../db/entity/Session.js";
import { serviceErr } from "../errors/ServiceError.js";

export class SessionService implements SessionRepository {
  repository = AppDataSource.getRepository(Session)

  async find(limit?: number, offset?: number): Promise<SessionDTO[]> {
    return await this.repository.find({
      skip: offset,
      take: limit,
    })
  }
  async findOne(id: number): Promise<SessionDTO> {
    const session = await this.repository.findOneBy({id})
    if(!session) {
      throw serviceErr(404, "Session not found")
    }
    return session
  }
  async create(data: SessionDTO): Promise<SessionDTO> {
    const newSession = this.repository.save(data)
    return newSession
  }
  async update(id: number, data: SessionDTO) {
    await this.findOne(id)  
    await this.repository.update(id, data)
  }
  async delete(id: number) {
    await this.findOne(id)
    await this.repository.delete(id)
  }
}
