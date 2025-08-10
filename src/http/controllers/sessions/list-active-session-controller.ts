import { FastifyRequest, FastifyReply } from "fastify";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeListActiveSessionsService } from "@/instancies/sessions/make-list-active-sessions-service";

export async function listActiveSessionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listSessionsService = makeListActiveSessionsService();

    const sessions = await listSessionsService.execute();

    return reply.status(200).send(sessions);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
