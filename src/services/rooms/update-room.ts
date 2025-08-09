import { RoomsRepository } from "@/repositories/rooms-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { AlreadyExistsError } from "../errors/already-exists-error";

interface RequestType {
  name: string;
  room_id: string;
}

export class UpdateRoomService {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({ name, room_id }: RequestType) {
    const data = await this.roomsRepository.findById(room_id);

    if (!data) {
      throw new ResourceNotFoundError();
    }

    const nameExists = await this.roomsRepository.findByName(name);

    if (nameExists) {
      throw new AlreadyExistsError();
    }

    data.name = name;

    await this.roomsRepository.save(data);

    return data;
  }
}
