import { Prisma, Logs } from "@prisma/client";

export interface LogsRepository {
  create(data: Prisma.LogsCreateInput): Promise<Logs>;
  save(user: Logs): Promise<Logs>;
  listAll(): Promise<Logs[]>;
}
