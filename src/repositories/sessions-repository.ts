import { Prisma, Sessions } from "@prisma/client";

export interface SessionsRepository {
  create(data: Prisma.SessionsUncheckedCreateInput): Promise<Sessions>;
  save(user: Sessions): Promise<Sessions>;
  listAll(): Promise<Sessions[]>;
  findById(id: string): Promise<Sessions | null>;
  findByVisitorId(id: string): Promise<Sessions | null>;
  listActive(): Promise<Sessions[]>;
  totalActive(): Promise<number>;
}
