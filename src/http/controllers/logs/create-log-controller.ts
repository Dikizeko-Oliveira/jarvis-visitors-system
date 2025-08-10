import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { AlreadyExistsError } from "@/services/errors/already-exists-error";
import { makeCreateLogService } from "@/instancies/logs/make-create-log-service";

export async function createLogController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      topic: z.string(),
    });

    const { topic } = registerBodySchema.parse(request.body);

    const createLogService = makeCreateLogService();

    const log = await createLogService.execute({ topic });

    return reply.status(200).send(log);
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
