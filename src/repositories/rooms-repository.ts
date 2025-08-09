import { Prisma, Rooms } from "@prisma/client";

export interface RoomsRepository {
  create(data: Prisma.RoomsCreateInput): Promise<Rooms>;
  save(user: Rooms): Promise<Rooms>;
  listAll(): Promise<Rooms[]>;
  findById(id: string): Promise<Rooms | null>;
  findByName(name: string): Promise<Rooms | null>;
}
