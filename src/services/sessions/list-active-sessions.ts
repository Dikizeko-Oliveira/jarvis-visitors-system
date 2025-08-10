import { SessionsRepository } from "@/repositories/sessions-repository";

export class ListActiveSessionsService {
  constructor(private sessionsRepository: SessionsRepository) {}

  async execute() {
    const findSessions = await this.sessionsRepository.listActive();

    return findSessions;
  }
}
