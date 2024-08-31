import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { GetPetUseCase } from "./get-pet.use-case";
import { PetNotFoundError } from "./errors/pet-not-found.error";

let orgsRepository: inMemoryOrgsRepository
let petsRepository: inMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
    beforeEach(() => {
        petsRepository = new inMemoryPetsRepository(orgsRepository)
        sut = new GetPetUseCase(petsRepository)

    })
    it('Should be able to get a pet', async () => {
        const createPet = await petsRepository.create({
            name: 'Harry',
            about: 'Cachorro. Raça: mestiço, Cor: pardo',
            age: '1 ano',
            size: 'pequeno',
            energy_level: 'enérgico',
            environment: 'Médio',
            org_id: 'org.id',
        })

        const { pet } = await sut.execute({
            id: createPet.id,
        })

        expect(pet.id).toEqual(expect.any(String))
        expect(pet.name).toEqual('Harry')
    })

    it('should not be able to get a non-existing pet', async () => {
        await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
            PetNotFoundError,
        )
    })
})