import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet.use-case'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
    const createPetbodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        size: z.string(),
        energy_level: z.string(),
        environment: z.string(),
    })

    const {
        name,
        about,
        age,
        size,
        energy_level,
        environment,
    } = createPetbodySchema.parse(request.body)

    const createPetUseCase = makeCreatePetUseCase()

    const org_id = request.user.sub

    try {

        const { pet } = await createPetUseCase.execute({
            name,
            about,
            age,
            size,
            energy_level,
            environment,
            org_id,
        })
        return reply.status(201).send(pet)

    } catch (error) {
        if (error instanceof OrgNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        console.log(error)

        return reply.status(500).send({ message: 'Internal server error' })
    }

}
