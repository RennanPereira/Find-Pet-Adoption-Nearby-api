import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { SearchPetsUseCase } from "./search-pets.use-case";

let orgsRepository: inMemoryOrgsRepository
let petsRepository: inMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
    beforeEach(() => {
        orgsRepository = new inMemoryOrgsRepository()
        petsRepository = new inMemoryPetsRepository(orgsRepository)
        sut = new SearchPetsUseCase(petsRepository)
    })
    it('should be able to search pets by city', async () => {
        const org1 = await orgsRepository.create({
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

        const org2 = await orgsRepository.create({
            id: 'org-02',
            name: 'TypeScript Dogs',
            owners_name: 'John Doe',
            email: 'johndoe2@exemple.com',
            password_hash: '123456',
            whatsapp: '12213987654',
            cep: '51423142',
            state: 'Ceará',
            city: 'Maracanaú',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })

        await petsRepository.create({
            name: 'Harry',
            about: 'Cachorro. Raça: mestiço, Cor: pardo',
            age: '1 ano',
            size: 'pequeno',
            energy_level: 'enérgico',
            environment: 'Médio',
            org_id: org1.id,
        })

        await petsRepository.create({
            name: 'Mike',
            about: 'Cachorro. Raça: mestiço, Cor: branco',
            age: '8 ano',
            size: 'médio',
            energy_level: 'calmo',
            environment: 'Médio',
            org_id: org1.id,
        })

        await petsRepository.create({
            name: 'Katherine',
            about: 'Cachorro. Raça: mestiço, Cor: branco com preto',
            age: '2 ano',
            size: 'pequena',
            energy_level: 'energico',
            environment: 'Médio',
            org_id: org2.id,
        })

        const { pets } = await sut.execute({
            city: org1.city,
        })

        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org2.city })

        expect(pets2).toHaveLength(1)
    })
})
