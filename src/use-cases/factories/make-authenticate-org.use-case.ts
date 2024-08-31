import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate-org.use-case";

export function makeAuthenticateOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    return sut
}