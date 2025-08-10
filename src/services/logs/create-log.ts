import { LogsRepository } from "@/repositories/logs-repository";

interface RequestType {
  topic: string;
}

export class CreateLogService {
  constructor(private logsRepository: LogsRepository) {}

  async execute({ topic }: RequestType) {
    const createdLog = await this.logsRepository.create({ topic });

    return createdLog;
  }
}
