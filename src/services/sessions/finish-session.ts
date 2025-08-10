import { SessionsRepository } from "@/repositories/sessions-repository";
import type { RoomsRepository } from "@/repositories/rooms-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { VisitorsRepository } from "@/repositories/visitors-repository";

interface RequestType {
  session_id: string;
}

export class FinishSessionService {
  constructor(
    private sessionsRepository: SessionsRepository,
    private roomsRepository: RoomsRepository,
    private visitorsRepository: VisitorsRepository
  ) {}

  async execute({ session_id }: RequestType) {
    const findSession = await this.sessionsRepository.findById(session_id);

    if (!findSession) {
      throw new ResourceNotFoundError();
    }

    findSession.exit_date = new Date();
    findSession.is_active = false;

    await this.sessionsRepository.save(findSession);

    const findRoom = await this.roomsRepository.findById(findSession.room_id);

    if (findRoom) {
      findRoom.active_visitors = Number(findRoom.active_visitors) - 1;
      findRoom.is_available = true;
      await this.roomsRepository.save(findRoom);
    }

    const visitor = await this.visitorsRepository.findById(
      findSession.visitor_id
    );

    if (visitor) {
      visitor.is_active = false;
      await this.visitorsRepository.save(visitor);
    }
  }
}
