import { Prisma, Visitors } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { VisitorsRepository } from "../visitors-repository";

export class PrismaVisitorsRepository implements VisitorsRepository {
  async create(data: Prisma.VisitorsCreateInput) {
    const response = await prisma.visitors.create({
      data,
    });

    return response;
  }

  async listAll() {
    const response = await prisma.visitors.findMany();

    return response;
  }

  async findById(id: string) {
    const data = await prisma.visitors.findUnique({ where: { id } });

    return data;
  }

  async findByCpf(cpf: string) {
    const data = await prisma.visitors.findFirst({ where: { cpf } });

    return data;
  }

  async save(data: Visitors) {
    const response = await prisma.visitors.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
