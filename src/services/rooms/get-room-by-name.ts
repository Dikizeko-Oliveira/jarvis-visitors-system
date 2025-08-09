import { RoomsRepository } from "@/repositories/rooms-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface RequestType {
  room_name: string;
}

export class GetRoomByNameService {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({ room_name }: RequestType) {
    const data = await this.roomsRepository.findByName(room_name);

    if (!data) {
      throw new ResourceNotFoundError();
    }

    return data;
  }
}
