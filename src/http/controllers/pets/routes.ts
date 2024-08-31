import { FastifyInstance } from 'fastify'
import { createPet } from '../pets/create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPet } from './get-pet'
import { searchPet } from './search-pets'

export async function petsRoutes(app: FastifyInstance) {
    app.post('/orgs/pets', { onRequest: [verifyJWT] }, createPet)
    app.get('/orgs/pets/search', searchPet)
    app.get('/orgs/pets/:id', getPet)
}
