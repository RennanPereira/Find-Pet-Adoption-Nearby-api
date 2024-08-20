import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/create-org'
import { authenticate } from './controllers/authenticate'
import { createPet } from './controllers/create-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/sessions', authenticate)
  app.post('/pets', createPet)

}
