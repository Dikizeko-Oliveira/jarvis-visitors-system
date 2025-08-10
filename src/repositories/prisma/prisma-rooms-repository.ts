import { Prisma, Rooms } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { RoomsRepository } from "../rooms-repository";

export class PrismaRoomsRepository implements RoomsRepository {
  async create(data: Prisma.RoomsCreateInput) {
    const question = await prisma.rooms.create({
      data,
    });

    return question;
  }

  async listAll() {
    const questions = await prisma.rooms.findMany();

    return questions;
  }

  async findById(id: string) {
    const question = await prisma.rooms.findUnique({ where: { id } });

    return question;
  }

  async listAvailable() {
    const question = await prisma.rooms.findMany({
      where: { is_available: true },
    });

    return question;
  }

  async listUnavailable() {
    const question = await prisma.rooms.findMany({
      where: { is_available: false },
    });

    return question;
  }

  async findByName(name: string) {
    const question = await prisma.rooms.findFirst({ where: { name } });

    return question;
  }

  async save(data: Rooms) {
    const question = await prisma.rooms.update({
      where: {
        id: data.id,
      },
      data,
    });

    return question;
  }
}
