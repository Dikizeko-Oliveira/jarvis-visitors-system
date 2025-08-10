import { PrismaLogsRepository } from "../../repositories/prisma/prisma-logs-repository";
import { ListLogsService } from "@/services/logs/list-logs";

export function makeListLogsService() {
  const prismaLogsRepository = new PrismaLogsRepository();
  const listLogsService = new ListLogsService(prismaLogsRepository);

  return listLogsService;
}
