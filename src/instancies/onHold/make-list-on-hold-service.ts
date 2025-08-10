import { PrismaOnHoldRepository } from "../../repositories/prisma/prisma-on-hold-repository";
import { GetOnHoldService } from "@/services/on-hold/list-on-hold";

export function makeListOnHoldService() {
  const prismaOnHoldRepository = new PrismaOnHoldRepository();
  const listOnHoldService = new GetOnHoldService(prismaOnHoldRepository);

  return listOnHoldService;
}
