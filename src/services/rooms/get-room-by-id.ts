import { RoomsRepository } from "@/repositories/rooms-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface RequestType {
  room_id: string;
}

export class GetRoomByIdService {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute({ room_id }: RequestType) {
    const data = await this.roomsRepository.findById(room_id);

    if (!data) {
      throw new ResourceNotFoundError();
    }

    return data;
  }
}
