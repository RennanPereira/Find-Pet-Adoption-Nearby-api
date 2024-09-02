import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { makeFetchNearbyOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs.use-case'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'

export async function fetchNearbyOrgs(request: FastifyRequest, reply: FastifyReply) {
    const nearbyOrgsQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyOrgsQuerySchema.parse(request.query)

    const FetchNearbyOrgsUseCase = makeFetchNearbyOrgsUseCase()

    const { orgs } = await FetchNearbyOrgsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(200).send({
        orgs,
    })
}
