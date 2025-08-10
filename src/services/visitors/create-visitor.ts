import { VisitorsRepository } from "@/repositories/visitors-repository";
import { AlreadyExistsError } from "../errors/already-exists-error";
import type { RoomsRepository } from "@/repositories/rooms-repository";

interface RequestType {
  name: string;
  cpf: string;
  room_id: string;
  email: string | null;
  birthdate: string | null;
}

export class CreateVisitorService {
  constructor(
    private visitorsRepository: VisitorsRepository,
    private roomsRepository: RoomsRepository
  ) {}

  async execute({ name, birthdate, cpf, email, room_id }: RequestType) {
    const alreadyExists = await this.visitorsRepository.findByCpf(cpf);

    if (alreadyExists) {
      throw new AlreadyExistsError();
    }

    const createdVisitor = await this.visitorsRepository.create({
      birthdate,
      cpf,
      email,
      name,
      room_id,
    });

    const findRoom = await this.roomsRepository.findById(room_id);

    if (findRoom) {
      findRoom.visitors = Number(findRoom.visitors) + 1;

      await this.roomsRepository.save(findRoom);
    }

    return createdVisitor;
  }
}
