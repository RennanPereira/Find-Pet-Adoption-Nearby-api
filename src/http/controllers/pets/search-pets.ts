import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet.use-case'


export async function searchPet(request: FastifyRequest, reply: FastifyReply,) {
    const querychema = z.object({
        city: z.string().min(1),
        age: z.string().optional(),
        size: z.string().optional(),
        energy_level: z.string().optional(),
        environment: z.string().optional(),
    })

    const { city, age, size, energy_level, environment, } = querychema.parse(
        request.query,
    )

    const searchPetUseCase = makeSearchPetUseCase()

    try {
        const { pets } = await searchPetUseCase.execute({
            city,
            age,
            size,
            energy_level,
            environment,
        })

        return reply.status(200).send({ pets })
    } catch (error) {
        console.log(error)

        return reply.status(500).send({ message: 'Internal server error' })
    }

}
