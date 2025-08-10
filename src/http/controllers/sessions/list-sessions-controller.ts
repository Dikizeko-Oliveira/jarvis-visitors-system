import { FastifyRequest, FastifyReply } from "fastify";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeListSessionsService } from "@/instancies/sessions/make-list-sessions-service";

export async function listSessionsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listSessionsService = makeListSessionsService();

    const sessions = await listSessionsService.execute();

    return reply.status(200).send(sessions);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
