import { FastifyInstance } from "fastify";

import { listOverviewController } from "../list-overview";

export async function overviewRoutes(app: FastifyInstance) {
  app.get("/overview/list-all", listOverviewController);
}
