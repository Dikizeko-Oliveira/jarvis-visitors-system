import { FastifyInstance } from "fastify";

import { createSessionController } from "../create-session-controller";
import { finishSessionController } from "../finish-session-controller";
import { listSessionsController } from "../list-sessions-controller";
import { listActiveSessionController } from "../list-active-session-controller";

export async function sessionsRoutes(app: FastifyInstance) {
  app.get("/sessions/list-all", listSessionsController);
  app.get("/sessions/list-active", listActiveSessionController);

  app.post("/sessions/create", createSessionController);
  app.post("/sessions/finish", finishSessionController);
}
