import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create pet (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a new pet', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)
        console.log(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })
        console.log(authResponse.body)

        const response = await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet())
        expect(response.status).toBe(201)
    })
})