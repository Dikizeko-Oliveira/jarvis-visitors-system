import { VisitorsRepository } from "@/repositories/visitors-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface RequestType {
  cpf: string;
}

export class GetVisitorByCpfService {
  constructor(private visitorsRepository: VisitorsRepository) {}

  async execute({ cpf }: RequestType) {
    const visitor = await this.visitorsRepository.findByCpf(cpf);

    if (!visitor) {
      throw new ResourceNotFoundError();
    }

    return visitor;
  }
}
