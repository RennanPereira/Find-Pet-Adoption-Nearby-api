import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet.use-case";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { OrgNotFoundError } from "./errors/org-not-found.error";

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
        const org = await orgsRepository.create({
            id: 'org-01',
            name: 'JavaScript Dogs',
            owners_name: 'John Doe',
            email: 'johndoe@exemple.com',
            password_hash: '123456',
            whatsapp: '12213412341',
            cep: '51423142',
            state: 'Ceará',
            city: 'Pajuçara',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })

        const { pet } = await sut.execute({
            name: 'Harry',
            about: 'Cachorro. Raça: mestiço, Cor: pardo',
            age: '1 ano',
            size: 'pequeno',
            energy_level: 'enérgico',
            environment: 'Médio',
            org_id: org.id,
        })
        expect(petsRepository.items).toHaveLength(1)
        expect(pet.id).toEqual(expect.any(String))
    })

    it('should not be able to create a new pet with no organization', async () => {
        const pet = await petsRepository.create({
            name: 'Harry',
            about: 'Cachorro. Raça: mestiço, Cor: pardo',
            age: '1 ano',
            size: 'pequeno',
            energy_level: 'enérgico',
            environment: 'Médio',
            org_id: 'non-existing-id',
        })
        expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
    })

})