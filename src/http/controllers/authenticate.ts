import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/use-case/factories/make-authenticate-org.use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const AuthenticatebodySchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    })

    const {
        email,
        password,
    } = AuthenticatebodySchema.parse(request.body)

    try {
        const sut = makeAuthenticateOrgUseCase()

        await sut.execute({
            email,
            password,
        })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }
}
