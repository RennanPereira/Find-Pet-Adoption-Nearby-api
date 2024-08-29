import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet.use-case";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { OrgNotFoundError } from "./errors/org-not-found.error";
import { makeOrg } from "tests/factories/make-org.factory";
import { makePet } from "tests/factories/make-pet.factory";

let orgsRepository: inMemoryOrgsRepository
let petsRepository: inMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
    beforeEach(() => {
        orgsRepository = new inMemoryOrgsRepository()
        petsRepository = new inMemoryPetsRepository(orgsRepository)
        sut = new CreatePetUseCase(orgsRepository, petsRepository)

    })
    it('Should be able to create a new pet', async () => {
        const org = await orgsRepository.create(makeOrg())
        const { pet } = await sut.execute(makePet({ org_id: org.id }))

        expect(petsRepository.items).toHaveLength(1)
        expect(pet.id).toEqual(expect.any(String))
    })

    it('should not be able to create a new pet with no organization', async () => {
        await expect(() =>
            sut.execute(
                (makePet({ org_id: 'non-existent-org-id' }))

            )).rejects.toBeInstanceOf(OrgNotFoundError)
    })

})