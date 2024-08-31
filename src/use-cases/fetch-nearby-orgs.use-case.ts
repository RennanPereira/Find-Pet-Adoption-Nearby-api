import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchNearbyOrgsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyOrgsUseCaseResponse {
    orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
    constructor(private orgsRepository: OrgsRepository) { }

    async execute({
        userLatitude,
        userLongitude,
    }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {

        const orgs = await this.orgsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            orgs,
        }
    }
}
