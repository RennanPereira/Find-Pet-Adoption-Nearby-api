import { Pet, Prisma } from "@prisma/client";

export interface FindByCityParams {
    city: string
}

export interface PetsRepository {
    findByCity(params: FindByCityParams): Promise<Pet[]>
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}