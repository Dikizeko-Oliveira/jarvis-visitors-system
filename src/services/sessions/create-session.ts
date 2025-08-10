import { SessionsRepository } from "@/repositories/sessions-repository";
import { AlreadyExistsError } from "../errors/already-exists-error";
import type { RoomsRepository } from "@/repositories/rooms-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { VisitorsRepository } from "@/repositories/visitors-repository";
import { RoomNotAvailable } from "../errors/room-not-available";
import type { OnHoldRepository } from "@/repositories/on-hold-repository";
import { makeCreateLogService } from "@/instancies/logs/make-create-log-service";

interface RequestType {
  visitor_id: string;
  room_id: string;
}

export class CreateSessionService {
  constructor(
    private sessionsRepository: SessionsRepository,
    private roomsRepository: RoomsRepository,
    private visitorsRepository: VisitorsRepository,
    private onHoldRepository: OnHoldRepository
  ) {}

  async execute({ visitor_id, room_id }: RequestType) {
    const findRoom = await this.roomsRepository.findById(room_id);
    const findVisitorSession =
      await this.sessionsRepository.findByVisitorId(visitor_id);

    if (!findRoom) {
      throw new UnauthorizedError();
    }

    // Valida se o visitante já tem uma sessão ativa (visita em outra sala ativa)
    if (findVisitorSession && findVisitorSession.is_active) {
      throw new AlreadyExistsError();
    }

    const alreadyOnHold =
      await this.onHoldRepository.findByVisitorId(visitor_id);

    if (!findRoom.is_available) {
      if (!alreadyOnHold) {
        await this.onHoldRepository.create({
          room_id,
          visitor_id,
        });

        const createLogService = makeCreateLogService();

        await createLogService.execute({
          topic: `Visitante inserido na lista de espera`,
        });
      }

      throw new RoomNotAvailable();
    }

    if (alreadyOnHold) {
      await this.onHoldRepository.delete(visitor_id);
    }

    if (Number(findRoom.active_visitors) === 2) {
      findRoom.is_available = false;
    }

    findRoom.active_visitors = Number(findRoom.active_visitors) + 1;
    findRoom.visitors =
      Number(findRoom.visitors) > 0 ? Number(findRoom.visitors) - 1 : 0;

    await this.roomsRepository.save(findRoom);

    const visitor = await this.visitorsRepository.findById(visitor_id);

    if (visitor && !visitor.is_active) {
      visitor.is_active = true;
      await this.visitorsRepository.save(visitor);
    }

    const createdSession = await this.sessionsRepository.create({
      visitor_id,
      room_id,
    });

    return createdSession;
  }
}
