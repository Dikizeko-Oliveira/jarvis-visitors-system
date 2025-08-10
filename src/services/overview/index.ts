import { SessionsRepository } from "@/repositories/sessions-repository";
import type { RoomsRepository } from "@/repositories/rooms-repository";
import type { OnHoldRepository } from "@/repositories/on-hold-repository";

export class OverviewService {
  constructor(
    private sessionsRepository: SessionsRepository,
    private roomsRepository: RoomsRepository,
    private onHoldRepository: OnHoldRepository
  ) {}

  async execute() {
    const totalVisitorsActive = await this.sessionsRepository.totalActive();
    const findRooms = await this.roomsRepository.listAll();
    const findActiveSessions = await this.sessionsRepository.listActive();
    const onHoldList = await this.onHoldRepository.listAll();

    const totalVisitorsOnHold = findRooms.reduce(
      (total, room) => total + Number(room.visitors),
      0
    );

    const data = {
      active_visitors: findActiveSessions,
      on_hold_list: onHoldList,
      total_visitors_active: totalVisitorsActive,
      total_visitors_on_hold: totalVisitorsOnHold,
    };

    return data;
  }
}
