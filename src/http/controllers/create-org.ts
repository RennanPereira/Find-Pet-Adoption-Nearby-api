import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { CreateOrgUseCase } from '@/use-cases/create-org.use-case'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org.use-case'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        owners_name: z.string(),
        email: z.string(),
        password: z.string().min(6),
        whatsapp: z.string().min(11),
        cep: z.string(),
        state: z.string(),
        city: z.string(),
        street: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const {
        name,
        owners_name,
        email,
        password,
        whatsapp,
        cep,
        state,
        city,
        street,
        latitude,
        longitude,
    } = bodySchema.parse(request.body)

    try {
        const createOrgrUseCase = makeCreateOrgUseCase()

        await createOrgrUseCase.execute({
            name,
            owners_name,
            email,
            password,
            whatsapp,
            cep,
            state,
            city,
            street,
            latitude,
            longitude,
        })
    } catch (err) {
        if (err instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }

    return reply.status(201).send()
}
