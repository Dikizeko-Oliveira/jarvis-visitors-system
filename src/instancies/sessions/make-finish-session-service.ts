import { PrismaVisitorsRepository } from "../../repositories/prisma/prisma-visitors-repository";
import { PrismaSessionsRepository } from "../../repositories/prisma/prisma-sessions-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { FinishSessionService } from "@/services/sessions/finish-session";

export function makeFinishSessionService() {
  const prismaSessionsRepository = new PrismaSessionsRepository();
  const prismaVisitorsRepository = new PrismaVisitorsRepository();
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const finishVisitorservice = new FinishSessionService(
    prismaSessionsRepository,
    prismaRoomsRepository,
    prismaVisitorsRepository
  );

  return finishVisitorservice;
}
