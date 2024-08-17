import { Pet, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { CreatePetRepository } from "../create-pet-repository";

export class inMemoryCreatePetRepository implements CreatePetRepository {
    public items: Pet[] = []



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