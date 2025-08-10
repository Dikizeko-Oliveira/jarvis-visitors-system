import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetVisitorByCpfService } from "@/instancies/visitors/make-get-visitor-by-cpf-service";

export async function getVisitorByCpfController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerQuerySchema = z.object({
      cpf: z.string(),
    });

    const { cpf } = registerQuerySchema.parse(request.query);

    const getVisitorByCpfService = makeGetVisitorByCpfService();

    const visitor = await getVisitorByCpfService.execute({ cpf });

    return reply.status(200).send(visitor);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
