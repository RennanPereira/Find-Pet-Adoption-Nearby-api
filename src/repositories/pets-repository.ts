import { Pet, Prisma } from "@prisma/client";

export interface FindByCityParams {
    city: string
    size?: string
    age?: string
    energy_level?: string
    environment?: string
}

export interface PetsRepository {
    findAll(params: FindByCityParams): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}