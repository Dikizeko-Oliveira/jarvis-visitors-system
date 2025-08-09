import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { GetRoomByNameService } from "@/services/rooms/get-room-by-name";

export function makeGetRoomByNameService() {
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const getRoomByNameService = new GetRoomByNameService(prismaRoomsRepository);

  return getRoomByNameService;
}
