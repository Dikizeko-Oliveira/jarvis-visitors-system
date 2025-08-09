import { RoomsRepository } from "@/repositories/rooms-repository";
import { AlreadyExistsError } from "../errors/already-exists-error";

interface RequestType {
  name: string;
}

export class CreateRoomService {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({ name }: RequestType) {
    const data = await this.roomsRepository.findByName(name);

    if (data) {
      throw new AlreadyExistsError();
    }

    const createdRoom = await this.roomsRepository.create({ name });

    return createdRoom;
  }
}
