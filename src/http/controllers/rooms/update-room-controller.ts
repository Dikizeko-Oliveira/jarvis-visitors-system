import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeUpdateRoomService } from "@/instancies/rooms/make-update-room-service";
import { AlreadyExistsError } from "@/services/errors/already-exists-error";

export async function updateRoomController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      room_id: z.string(),
    });

    const { name, room_id } = registerBodySchema.parse(request.body);

    const getRoomsService = makeUpdateRoomService();

    const room = await getRoomsService.execute({ name, room_id });

    return reply.status(200).send(room);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
