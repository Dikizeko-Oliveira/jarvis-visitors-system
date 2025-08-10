import { FastifyInstance } from "fastify";
import { createLogController } from "../create-log-controller";
import { listLogsController } from "../list-logs-controller";

export async function logsRoutes(app: FastifyInstance) {
  app.get("/logs/list-all", listLogsController);
  app.post("/logs/create", createLogController);
}
