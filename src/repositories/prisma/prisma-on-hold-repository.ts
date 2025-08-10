import { Prisma, OnHold } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { OnHoldRepository } from "../on-hold-repository";

export class PrismaOnHoldRepository implements OnHoldRepository {
  async create(data: Prisma.OnHoldCreateInput) {
    const response = await prisma.onHold.create({
      data,
    });

    return response;
  }

  async findByVisitorId(visitor_id: string) {
    const response = await prisma.onHold.findFirst({ where: { visitor_id } });

    return response;
  }

  async listAll() {
    const response = await prisma.onHold.findMany({
      include: { room: true, visitor: true },
    });

    return response;
  }

  async delete(id: string) {
    const response = await prisma.onHold.delete({ where: { id } });

    return response;
  }

  async save(data: OnHold) {
    const response = await prisma.onHold.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
