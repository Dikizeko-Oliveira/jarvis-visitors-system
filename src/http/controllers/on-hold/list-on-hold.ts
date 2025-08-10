import { FastifyRequest, FastifyReply } from "fastify";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeListOnHoldService } from "@/instancies/onHold/make-list-on-hold-service";

export async function listOnHoldController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listOnHold = makeListOnHoldService();

    const list = await listOnHold.execute();

    return reply.status(200).send(list);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
