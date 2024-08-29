import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet.use-case";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeCreatePetUseCase() {
    return new CreatePetUseCase(
        new PrismaOrgsRepository(),
        new PrismaPetsRepository(),
    )
}