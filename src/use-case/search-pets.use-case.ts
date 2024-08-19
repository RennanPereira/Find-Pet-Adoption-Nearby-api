import { PetsRepository } from "@/repositories/pets-repository"
import { Pet } from "@prisma/client"

interface SearchPetsUseCaseRequest {
    city: string
}

interface SearchPetsUseCaseResponse {
    pets: Pet[]
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) { }

    async execute({
        city,
    }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
        const pets = await this.petsRepository.findByCity({
            city,
        })
        return {
            pets
        }
    }
}