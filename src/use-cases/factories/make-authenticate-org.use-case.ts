import { PrismaOrgsRepository } from "@/repositories/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    return sut
}