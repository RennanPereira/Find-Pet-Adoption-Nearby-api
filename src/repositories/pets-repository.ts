import { Pet, Prisma } from "@prisma/client";

export interface FindByCityParams {
    city: string
}

export interface PetsRepository {
    findByCity(params: FindByCityParams): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}