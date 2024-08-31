import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-repository'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs.use-case'
import { makeOrg } from 'tests/factories/make-org.factory'

let orgsRepository: inMemoryOrgsRepository
let sut: FetchNearbyOrgsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        orgsRepository = new inMemoryOrgsRepository()
        sut = new FetchNearbyOrgsUseCase(orgsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        const org = await orgsRepository.create(makeOrg())


        const nearbyOrg = await sut.execute({
            userLatitude: org.latitude.toNumber(),
            userLongitude: org.longitude.toNumber(),
        })

        expect(nearbyOrg.orgs).toEqual([org])
    })
})