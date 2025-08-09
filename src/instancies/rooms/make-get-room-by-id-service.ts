import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { GetRoomByIdService } from "@/services/rooms/get-room-by-id";

export function makeGetRoomByIdService() {
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const getRoomByIdService = new GetRoomByIdService(prismaRoomsRepository);

  return getRoomByIdService;
}
