import { Org, Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
    name: string
    about: string
    age: string
    size: string
    energy_level: string
    environment: string
    org_id: string
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
    constructor(private petsRepository: any) { }

    async execute({
        name,
        about,
        age,
        size,
        energy_level,
        environment,
        org_id,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

        const pet = await this.petsRepository.create({
            org_id: org_id,
        })
        return {
            pet,
        }

    }
}