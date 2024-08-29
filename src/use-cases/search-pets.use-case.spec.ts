import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { SearchPetsUseCase } from "./search-pets.use-case";
import { makeOrg } from "tests/factories/make-org.factory";
import { makePet } from "tests/factories/make-pet.factory";

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
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id }))
        await petsRepository.create(makePet({ org_id: org.id }))

        const org2 = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org2.id }))

        const { pets } = await sut.execute({
            city: org.city,
        })

        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org2.city })

        expect(pets2).toHaveLength(1)
    })

    it('should be able to search pets by city and age', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, age: '1' }))
        await petsRepository.create(makePet({ org_id: org.id, age: '1' }))
        await petsRepository.create(makePet({ org_id: org.id, age: '8' }))

        const { pets } = await sut.execute({
            city: org.city,
            age: '1',
        })

        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org.city, age: '8' })

        expect(pets2).toHaveLength(1)
    })

    it('should be able to search pets by city and size', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, size: 'small' }))
        await petsRepository.create(makePet({ org_id: org.id, size: 'small' }))
        await petsRepository.create(makePet({ org_id: org.id, size: 'large' }))

        const { pets } = await sut.execute({
            city: org.city,
            size: 'small',
        })
        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org.city, size: 'large' })


        expect(pets2).toHaveLength(1)
    })

    it('should be able to search pets by city and energy level', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, energy_level: 'medium' }))
        await petsRepository.create(makePet({ org_id: org.id, energy_level: 'medium' }))
        await petsRepository.create(makePet({ org_id: org.id, energy_level: 'high' }))

        const { pets } = await sut.execute({
            city: org.city,
            energy_level: 'medium',
        })
        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org.city, energy_level: 'high' })

        expect(pets2).toHaveLength(1)
    })

    it('should be able to search pets by city and envirnment', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' }))
        await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' }))
        await petsRepository.create(makePet({ org_id: org.id, environment: 'outdoor' }))

        const { pets } = await sut.execute({
            city: org.city,
            environment: 'indoor',
        })
        expect(pets).toHaveLength(2)

        const { pets: pets2 } = await sut.execute({ city: org.city, environment: 'outdoor' })

        expect(pets2).toHaveLength(1)
    })
})
