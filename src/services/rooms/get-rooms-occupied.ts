import { RoomsRepository } from "@/repositories/rooms-repository";

export class GetRoomsOccupiedService {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute() {
    const data = await this.roomsRepository.listUnavailable();

    return data;
  }
}
