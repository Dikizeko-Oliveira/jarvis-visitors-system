import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { AlreadyExistsError } from "@/services/errors/already-exists-error";
import { makeCreateVisitorService } from "@/instancies/visitors/make-create-visitor-service";
import { makeCreateLogService } from "@/instancies/logs/make-create-log-service";

export async function createVisitorController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      cpf: z.string(),
      room_id: z.string(),
      email: z.string().nullable(),
      birthdate: z.string().nullable(),
    });

    const { name, birthdate, cpf, email, room_id } = registerBodySchema.parse(
      request.body
    );

    const createVisitorService = makeCreateVisitorService();

    const visitor = await createVisitorService.execute({
      name,
      cpf,
      room_id,
      birthdate,
      email,
    });

    const createLogService = makeCreateLogService();

    await createLogService.execute({
      topic: `Visitante cadastrado - ${name}`,
    });

    return reply.status(200).send(visitor);
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
