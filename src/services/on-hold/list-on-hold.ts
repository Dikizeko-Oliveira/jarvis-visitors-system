import { OnHoldRepository } from "@/repositories/on-hold-repository";

export class GetOnHoldService {
  constructor(private onHoldRepository: OnHoldRepository) {}

  async execute() {
    const data = await this.onHoldRepository.listAll();

    return data;
  }
}
