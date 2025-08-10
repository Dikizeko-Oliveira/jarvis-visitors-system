import { FastifyInstance } from "fastify";

import { createVisitorController } from "../create-visitor-controller";
import { getVisitorByCpfController } from "../get-visitor-by-cpf-controller";
import { getVisitorsController } from "../get-visitors-controller";

export async function visitorsRoutes(app: FastifyInstance) {
  app.get("/visitors/list-all", getVisitorsController);
  app.get("/visitors/by-cpf", getVisitorByCpfController);

  app.post("/visitors/create", createVisitorController);
}
