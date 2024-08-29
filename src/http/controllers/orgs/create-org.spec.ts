import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create org (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a new org', async () => {
        const response = await request(app.server).post('/orgs').send(makeOrg())

        expect(response.status).toBe(201)
    })
})