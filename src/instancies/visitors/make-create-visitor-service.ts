import { PrismaRoomsRepository } from "@/repositories/prisma/prisma-rooms-repository";
import { PrismaVisitorsRepository } from "../../repositories/prisma/prisma-visitors-repository";
import { CreateVisitorService } from "@/services/visitors/create-visitor";
const prismaRoomsRepository = new PrismaRoomsRepository();

export function makeCreateVisitorService() {
  const prismaVisitorsRepository = new PrismaVisitorsRepository();
  const createVisitorservice = new CreateVisitorService(
    prismaVisitorsRepository,
    prismaRoomsRepository
  );

  return createVisitorservice;
}
