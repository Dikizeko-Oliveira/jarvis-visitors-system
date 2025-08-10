import { FastifyRequest, FastifyReply } from "fastify";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetVisitorsService } from "@/instancies/visitors/make-get-visitors-service";

export async function getVisitorsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getVisitorsService = makeGetVisitorsService();

    const visitors = await getVisitorsService.execute();

    return reply.status(200).send(visitors);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
