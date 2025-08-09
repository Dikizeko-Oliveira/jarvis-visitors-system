import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreateRoomService } from "@/instancies/rooms/make-create-room-service";
import { AlreadyExistsError } from "@/services/errors/already-exists-error";

export async function createRoomController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
    });

    const { name } = registerBodySchema.parse(request.body);

    const getRoomsService = makeCreateRoomService();

    const room = await getRoomsService.execute({ name });

    return reply.status(200).send(room);
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
