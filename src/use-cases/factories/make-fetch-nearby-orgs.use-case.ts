import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet.use-case";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchNearbyOrgsUseCase } from "../fetch-nearby-orgs.use-case";

export function makeFetchNearbyOrgsUseCase() {
    return new FetchNearbyOrgsUseCase(
        new PrismaOrgsRepository(),
    )
}