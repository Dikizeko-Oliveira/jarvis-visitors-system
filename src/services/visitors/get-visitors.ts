import { VisitorsRepository } from "@/repositories/visitors-repository";

export class GetVisitorsService {
  constructor(private visitorsRepository: VisitorsRepository) {}

  async execute() {
    const visitors = await this.visitorsRepository.listAll();

    return visitors;
  }
}
