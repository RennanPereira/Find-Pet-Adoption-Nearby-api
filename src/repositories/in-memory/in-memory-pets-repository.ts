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


    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = {
            id: randomUUID(),
            ...data,
        }

        this.items.push(pet)

        return pet
    }

    async findById(id: string): Promise<Pet | null> {
        return this.items.find((item) => item.id === id) ?? null
    }
}