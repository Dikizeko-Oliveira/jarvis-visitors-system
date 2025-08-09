import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { UpdateRoomService } from "@/services/rooms/update-room";

export function makeUpdateRoomService() {
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const updateRoomService = new UpdateRoomService(prismaRoomsRepository);

  return updateRoomService;
}
