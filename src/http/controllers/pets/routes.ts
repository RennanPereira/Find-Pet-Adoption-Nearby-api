import { FastifyInstance } from 'fastify'
import { createPet } from '../pets/create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
export async function petsRoutes(app: FastifyInstance) {
    app.post('/orgs/pets', { onRequest: [verifyJWT] }, createPet)

}
