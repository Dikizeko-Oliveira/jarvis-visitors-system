import { makeGetRoomsOccupiedService } from "@/instancies/rooms/make-get-rooms-occupied-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getRoomsOccupiedController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getRoomsService = makeGetRoomsOccupiedService();

    const rooms = await getRoomsService.execute();

    return reply.status(200).send(rooms);
  } catch (error) {
    throw error;
  }
}
