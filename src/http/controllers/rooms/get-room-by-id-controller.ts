import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetRoomByIdService } from "@/instancies/rooms/make-get-room-by-id-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function getRoomByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerParamsSchema = z.object({
      id: z.string(),
    });

    const { id } = registerParamsSchema.parse(request.params);

    const getRoomsService = makeGetRoomByIdService();

    const room = await getRoomsService.execute({ room_id: id });

    return reply.status(200).send(room);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
