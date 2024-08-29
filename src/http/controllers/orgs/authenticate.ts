import { z } from 'Zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org.use-case'

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

        const { org } = await sut.execute({
            email,
            password,
        })
        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: org.id,
                },
            },
        )

        return reply.status(200).send({ token, })

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }
}
