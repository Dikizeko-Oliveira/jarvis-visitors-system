import { Prisma, OnHold } from "@prisma/client";

export interface OnHoldRepository {
  create(data: Prisma.OnHoldUncheckedCreateInput): Promise<OnHold>;
  save(user: OnHold): Promise<OnHold>;
  listAll(): Promise<OnHold[]>;
  delete(id: string): Promise<OnHold>;
  findByVisitorId(id: string): Promise<OnHold | null>;
}
