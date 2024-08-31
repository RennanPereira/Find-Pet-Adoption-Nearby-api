import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet.use-case'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
    const getPetbodySchema = z.object({
        id: z.string()
    })

    const { id } = getPetbodySchema.parse(request.params)

    const getPetUseCase = makeGetPetUseCase()

    try {

        const { pet } = await getPetUseCase.execute({ id })

        return reply.status(200).send(pet)

    } catch (error) {
        if (error instanceof PetNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        console.log(error)

        return reply.status(500).send({ message: 'Internal server error' })
    }

}
