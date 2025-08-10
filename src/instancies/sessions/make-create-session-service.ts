import { PrismaVisitorsRepository } from "../../repositories/prisma/prisma-visitors-repository";
import { PrismaSessionsRepository } from "../../repositories/prisma/prisma-sessions-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { PrismaOnHoldRepository } from "../../repositories/prisma/prisma-on-hold-repository";
import { CreateSessionService } from "@/services/sessions/create-session";

export function makeCreateSessionService() {
  const prismaSessionsRepository = new PrismaSessionsRepository();
  const prismaVisitorsRepository = new PrismaVisitorsRepository();
  const prismaOnHoldRepository = new PrismaOnHoldRepository();
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const createVisitorservice = new CreateSessionService(
    prismaSessionsRepository,
    prismaRoomsRepository,
    prismaVisitorsRepository,
    prismaOnHoldRepository
  );

  return createVisitorservice;
}
