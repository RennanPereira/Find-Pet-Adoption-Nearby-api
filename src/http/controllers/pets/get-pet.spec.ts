import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get pet (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get a new pet', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const response = await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet())

        const getPetResponse = await request(app.server)
            .get(`/orgs/pets/${response.body.id}`)
            .set('Authrization', `Bearer ${authResponse.body.token}`)

        expect(getPetResponse.status).toBe(200)
    })
})