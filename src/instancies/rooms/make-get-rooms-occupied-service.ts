import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { GetRoomsOccupiedService } from "@/services/rooms/get-rooms-occupied";

export function makeGetRoomsOccupiedService() {
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const getRoomsService = new GetRoomsOccupiedService(prismaRoomsRepository);

  return getRoomsService;
}
