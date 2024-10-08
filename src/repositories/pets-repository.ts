import { Pet, Prisma } from "@prisma/client";

export interface FindAllParams {
    city: string
    size?: string
    age?: string
    energy_level?: string
    environment?: string
}

export interface PetsRepository {
    findAll(params: FindAllParams): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}