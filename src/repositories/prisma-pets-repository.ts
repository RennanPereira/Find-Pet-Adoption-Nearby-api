import { prisma } from '@/lib/prisma'
import { Prisma, Org, Pet } from '@prisma/client'
import { FindByCityParams, PetsRepository } from './pets-repository'

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }

    async findByCity(params: FindByCityParams): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                org_id: {
                    contains: params.city,
                }
            },
        })
        return pets
    }

    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            }
        })
        return pet
    }

}
