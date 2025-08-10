import { FastifyInstance } from "fastify";
import { getRoomsController } from "../get-rooms-controller";
import { getRoomByIdController } from "../get-room-by-id-controller";
import { getRoomByNameController } from "../get-room-by-name-controller";
import { createRoomController } from "../create-room-controller";
import { updateRoomController } from "../update-room-controller";
import { getRoomsOccupiedController } from "../get-rooms-occupied-controller";

export async function roomsRoutes(app: FastifyInstance) {
  app.get("/rooms/list-all", getRoomsController);
  app.get("/rooms/by-id/:id", getRoomByIdController);
  app.get("/rooms/by-name", getRoomByNameController);
  app.get("/rooms/occupied", getRoomsOccupiedController);

  app.post("/rooms/create", createRoomController);
  app.put("/rooms/update", updateRoomController);
}
