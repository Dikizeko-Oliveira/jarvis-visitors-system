import { PrismaSessionsRepository } from "../../repositories/prisma/prisma-sessions-repository";
import { ListSessionsService } from "@/services/sessions/list-sessions";

export function makeListSessionsService() {
  const prismaSessionsRepository = new PrismaSessionsRepository();
  const listVisitorservice = new ListSessionsService(prismaSessionsRepository);

  return listVisitorservice;
}
