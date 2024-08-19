import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { FindByCityParams, PetsRepository } from "../pets-repository";
import { inMemoryOrgsRepository } from "./in-memory-repository";

export class inMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    constructor(private orgsRepository: inMemoryOrgsRepository) { }

    async findByCity(params: FindByCityParams): Promise<Pet[]> {
        const orgsByCity = this.orgsRepository.items.filter(
            (org) => org.city === params.city,
        )

        const pets = this.items.filter((item) => orgsByCity.some((org) => org.id === item.org_id))
        return pets
    }


    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            org_id: data.org_id,
            name: data.name,
            about: data.about,
            age: data.age,
            size: data.size,
            energy_level: data.energy_level,
            environment: data.environment
        }

        this.items.push(pet)

        return pet
    }
}