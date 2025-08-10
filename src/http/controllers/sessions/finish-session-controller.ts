import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeFinishSessionService } from "@/instancies/sessions/make-finish-session-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeCreateLogService } from "@/instancies/logs/make-create-log-service";

export async function finishSessionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      session_id: z.string(),
    });

    const { session_id } = registerBodySchema.parse(request.body);

    const finishSessionService = makeFinishSessionService();

    const session = await finishSessionService.execute({
      session_id,
    });

    const createLogService = makeCreateLogService();

    await createLogService.execute({
      topic: `Saída registrada.`,
    });

    return reply.status(204).send(session);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
