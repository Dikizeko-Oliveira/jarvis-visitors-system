import { FastifyRequest, FastifyReply } from "fastify";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeListOverviewService } from "@/instancies/overview/make-list-overview-service";

export async function listOverviewController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listOverView = makeListOverviewService();

    const list = await listOverView.execute();

    return reply.status(200).send(list);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
