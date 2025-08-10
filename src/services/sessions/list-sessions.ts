import { SessionsRepository } from "@/repositories/sessions-repository";

export class ListSessionsService {
  constructor(private sessionsRepository: SessionsRepository) {}

  async execute() {
    const findSessions = await this.sessionsRepository.listAll();

    return findSessions;
  }
}
