import { PrismaVisitorsRepository } from "../../repositories/prisma/prisma-visitors-repository";
import { GetVisitorByCpfService } from "@/services/visitors/get-visitor-by-cpf";

export function makeGetVisitorByCpfService() {
  const prismaVisitorsRepository = new PrismaVisitorsRepository();
  const getVisitorservice = new GetVisitorByCpfService(
    prismaVisitorsRepository
  );

  return getVisitorservice;
}
