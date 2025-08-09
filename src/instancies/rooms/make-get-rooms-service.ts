import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { GetRoomsService } from "@/services/rooms/get-rooms";

export function makeGetRoomsService() {
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const getRoomsService = new GetRoomsService(prismaRoomsRepository);

  return getRoomsService;
}
