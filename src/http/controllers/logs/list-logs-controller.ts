import { FastifyRequest, FastifyReply } from "fastify";

import { AlreadyExistsError } from "@/services/errors/already-exists-error";
import { makeListLogsService } from "@/instancies/logs/make-list-logs-service";

export async function listLogsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listLogsService = makeListLogsService();

    const logs = await listLogsService.execute();

    return reply.status(200).send(logs);
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
