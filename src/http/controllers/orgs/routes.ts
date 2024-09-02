import { FastifyInstance } from 'fastify'
import { createOrg } from './create-org'
import { authenticate } from './authenticate'
import { fetchNearbyOrgs } from './fetch-nearby-orgs'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/orgs/authenticate', authenticate)
  app.get('/orgs/nearby', fetchNearbyOrgs)

}
