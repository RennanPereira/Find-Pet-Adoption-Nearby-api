import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Nearby Orgs (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch nearby orgs', async () => {
        const org = makeOrg({ latitude: -3.8535462, longitude: -38.5795397 })
        const org2 = makeOrg({ latitude: -3.7117419, longitude: -38.5836401 })

        await request(app.server).post('/orgs').send(org)
        console.log(org, org2)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const response = await request(app.server)
            .get('/orgs/nearby')
            .query({
                latitude: -3.8535462,
                longitude: -38.5795397,
            })
            .set('Authrization', `Bearer ${authResponse.body.token}`)
            .send()

        expect(response.status).toBe(200)
        expect(response.body.orgs).toHaveLength(1)
    })
})