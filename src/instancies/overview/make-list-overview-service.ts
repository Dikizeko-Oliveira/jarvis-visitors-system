import { PrismaSessionsRepository } from "../../repositories/prisma/prisma-sessions-repository";
import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { PrismaOnHoldRepository } from "../../repositories/prisma/prisma-on-hold-repository";
import { OverviewService } from "@/services/overview/index";

export function makeListOverviewService() {
  const prismaSessionsRepository = new PrismaSessionsRepository();
  const prismaOnHoldRepository = new PrismaOnHoldRepository();
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const listOverviewservice = new OverviewService(
    prismaSessionsRepository,
    prismaRoomsRepository,
    prismaOnHoldRepository
  );

  return listOverviewservice;
}
