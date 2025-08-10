import { LogsRepository } from "@/repositories/logs-repository";

export class ListLogsService {
  constructor(private logsRepository: LogsRepository) {}

  async execute() {
    const logs = await this.logsRepository.listAll();

    return logs;
  }
}
