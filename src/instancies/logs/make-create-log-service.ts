import { PrismaLogsRepository } from "../../repositories/prisma/prisma-logs-repository";
import { CreateLogService } from "@/services/logs/create-log";

export function makeCreateLogService() {
  const prismaLogsRepository = new PrismaLogsRepository();
  const createLogsService = new CreateLogService(prismaLogsRepository);

  return createLogsService;
}
