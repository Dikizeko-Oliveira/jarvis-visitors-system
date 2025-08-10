import { Prisma, Logs } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { LogsRepository } from "../logs-repository";

export class PrismaLogsRepository implements LogsRepository {
  async create(data: Prisma.LogsCreateInput) {
    const response = await prisma.logs.create({
      data,
    });

    return response;
  }

  async listAll() {
    const response = await prisma.logs.findMany();

    return response;
  }

  async save(data: Logs) {
    const response = await prisma.logs.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
