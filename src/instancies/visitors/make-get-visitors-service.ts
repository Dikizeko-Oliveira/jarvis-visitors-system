import { PrismaVisitorsRepository } from "../../repositories/prisma/prisma-visitors-repository";
import { GetVisitorsService } from "@/services/visitors/get-visitors";

export function makeGetVisitorsService() {
  const prismaVisitorsRepository = new PrismaVisitorsRepository();
  const getVisitorservice = new GetVisitorsService(prismaVisitorsRepository);

  return getVisitorservice;
}
