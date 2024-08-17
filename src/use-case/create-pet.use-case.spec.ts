import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryCreatePetRepository } from "@/repositories/in-memory/in-memory-create-pet-repository";
import { CreatePetUseCase } from "./create-pet.use-case";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";

let orgsRepository: inMemoryOrgsRepository
let petRepository: inMemoryCreatePetRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
    beforeEach(async () => {
        orgsRepository = new inMemoryOrgsRepository()
        petRepository = new inMemoryCreatePetRepository()
        sut = new CreatePetUseCase(petRepository)

        await orgsRepository.create({
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
    })
    it('Should be able to create an pet registration', async () => {
        const { pet } = await sut.execute({
            name: 'Harry',
            about: 'Cachorro. Raça: mestiço, Cor: pardo',
            age: '1 ano',
            size: 'pequeno',
            energy_level: 'enérgico',
            environment: 'Médio',
            org_id: 'org-01',
        })
        expect(pet.id).toEqual(expect.any(String))
        console.log(pet)
    })

})