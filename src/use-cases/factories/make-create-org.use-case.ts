import { PrismaOrgsRepository } from "@/repositories/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org.use-case";

export function makeCreateOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const sut = new CreateOrgUseCase(orgsRepository)

    return sut
}