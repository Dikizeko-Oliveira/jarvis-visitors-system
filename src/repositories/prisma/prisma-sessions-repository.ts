import { Prisma, Sessions } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { SessionsRepository } from "../sessions-repository";

export class PrismaSessionsRepository implements SessionsRepository {
  async create(data: Prisma.SessionsCreateInput) {
    const response = await prisma.sessions.create({
      data,
    });

    return response;
  }

  async listAll() {
    const response = await prisma.sessions.findMany({
      include: { room: true, visitor: true },
    });

    return response;
  }

  async listActive() {
    const response = await prisma.sessions.findMany({
      where: { exit_date: null },
      include: { room: true, visitor: true },
    });

    return response;
  }

  async totalActive() {
    const response = await prisma.sessions.count({
      where: { exit_date: null, is_active: true },
    });

    return response;
  }

  async findById(id: string) {
    const data = await prisma.sessions.findUnique({ where: { id } });

    return data;
  }

  async findByVisitorId(visitor_id: string) {
    const data = await prisma.sessions.findFirst({ where: { visitor_id } });

    return data;
  }

  async save(data: Sessions) {
    const response = await prisma.sessions.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
