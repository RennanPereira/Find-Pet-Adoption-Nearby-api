import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search pets (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search pets by city', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet())

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet())

        const response = await request(app.server)
            .get('/orgs/pets/search')
            .query({ city: org.city })

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(2)

    })

    it('should not be able to search pets without city', async () => {
        const response = await request(app.server).get('/orgs/pets/search')

        expect(response.status).toBe(400)
    })

    it('should be able to search pets by city and age', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ age: '1' }))

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet())

        const response = await request(app.server)
            .get('/orgs/pets/search')
            .query({ city: org.city, age: '1' })

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)

    })

    it('should be able to search pets by city and size', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ size: 'small' }))

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ size: 'large' }))

        const response = await request(app.server)
            .get('/orgs/pets/search')
            .query({ city: org.city, size: 'small' })

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)

    })

    it('should be able to search pets by city and energy level', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ energy_level: 'low' }))

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ energy_level: 'high' }))

        const response = await request(app.server)
            .get('/orgs/pets/search')
            .query({ city: org.city, energy_level: 'high' })

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)
    })

    it('should be able to search pets by city and environment', async () => {
        const org = makeOrg()

        await request(app.server).post('/orgs').send(org)

        const authResponse = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ environment: 'indoor' }))

        await request(app.server)
            .post('/orgs/pets')
            .set('Authorization', `Bearer ${authResponse.body.token}`)
            .send(makePet({ environment: 'outdoor' }))

        const response = await request(app.server)
            .get('/orgs/pets/search')
            .query({ city: org.city, environment: 'indoor' })

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)

    })
})