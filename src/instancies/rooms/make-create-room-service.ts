import { PrismaRoomsRepository } from "../../repositories/prisma/prisma-rooms-repository";
import { CreateRoomService } from "@/services/rooms/create-room";

export function makeCreateRoomService() {
  const prismaRoomsRepository = new PrismaRoomsRepository();
  const createRoomService = new CreateRoomService(prismaRoomsRepository);

  return createRoomService;
}
