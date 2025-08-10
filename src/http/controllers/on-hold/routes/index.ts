import { FastifyInstance } from "fastify";

import { listOnHoldController } from "../list-on-hold";

export async function onHoldRoutes(app: FastifyInstance) {
  app.get("/on-hold/list-all", listOnHoldController);
}
