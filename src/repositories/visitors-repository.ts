import { Prisma, Visitors } from "@prisma/client";

export interface VisitorsRepository {
  create(data: Prisma.VisitorsUncheckedCreateInput): Promise<Visitors>;
  save(user: Visitors): Promise<Visitors>;
  listAll(): Promise<Visitors[]>;
  // listAllOnHold(): Promise<Visitors[]>;
  findById(id: string): Promise<Visitors | null>;
  findByCpf(cpf: string): Promise<Visitors | null>;
}
