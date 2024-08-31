import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets.use-case";

export function makeSearchPetUseCase() {
    return new SearchPetsUseCase(
        new PrismaPetsRepository(),
    )
}