import { Pet, Prisma } from "@prisma/client";

export interface CreatePetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}