import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { AlreadyExistsError } from "@/services/errors/already-exists-error";
import { makeCreateSessionService } from "@/instancies/sessions/make-create-session-service";
import { UnauthorizedError } from "@/services/errors/unauthorized-error";
import { makeCreateLogService } from "@/instancies/logs/make-create-log-service";
import { RoomNotAvailable } from "@/services/errors/room-not-available";

export async function createSessionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      visitor_id: z.string(),
      room_id: z.string(),
    });

    const { visitor_id, room_id } = registerBodySchema.parse(request.body);

    const createSessionService = makeCreateSessionService();

    const session = await createSessionService.execute({
      room_id,
      visitor_id,
    });

    const createLogService = makeCreateLogService();

    await createLogService.execute({
      topic: `Entrada registrada.`,
    });

    return reply.status(200).send(session);
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({ message: error.message });
    }

    if (error instanceof RoomNotAvailable) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
