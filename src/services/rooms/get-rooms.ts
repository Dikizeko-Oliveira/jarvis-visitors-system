import { RoomsRepository } from "@/repositories/rooms-repository";

export class GetRoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute() {
    const data = await this.roomsRepository.listAll();

    return data;
  }
}
