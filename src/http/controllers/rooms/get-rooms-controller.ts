import { makeGetRoomsService } from "@/instancies/rooms/make-get-rooms-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getRoomsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getRoomsService = makeGetRoomsService();

    const rooms = await getRoomsService.execute();

    return reply.status(200).send(rooms);
  } catch (error) {
    throw error;
  }
}
