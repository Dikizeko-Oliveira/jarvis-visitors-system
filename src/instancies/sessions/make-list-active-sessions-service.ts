import { PrismaSessionsRepository } from "../../repositories/prisma/prisma-sessions-repository";
import { ListActiveSessionsService } from "@/services/sessions/list-active-sessions";

export function makeListActiveSessionsService() {
  const prismaSessionsRepository = new PrismaSessionsRepository();
  const listVisitorservice = new ListActiveSessionsService(
    prismaSessionsRepository
  );

  return listVisitorservice;
}
