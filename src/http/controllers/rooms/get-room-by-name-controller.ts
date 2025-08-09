import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetRoomByNameService } from "@/instancies/rooms/make-get-room-by-name-service";

export async function getRoomByNameController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerQuerySchema = z.object({
      name: z.string(),
    });

    const { name } = registerQuerySchema.parse(request.query);

    const getRoomsService = makeGetRoomByNameService();

    const room = await getRoomsService.execute({ room_name: name });

    return reply.status(200).send(room);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
