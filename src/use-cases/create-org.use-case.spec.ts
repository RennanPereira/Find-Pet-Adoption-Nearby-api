import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org.use-case";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgsRepository: inMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new inMemoryOrgsRepository()
        sut = new CreateOrgUseCase(orgsRepository)
    })
    it('Should be able to create an org', async () => {
        const { org } = await sut.execute({
            name: 'JavaScript Dogs',
            owners_name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
            whatsapp: '12213412341',
            cep: '51423142',
            state: 'Ceará',
            city: 'Pajuçara',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })
        expect(org.id).toEqual(expect.any(String))
    })

    it('Should hash password upon creation', async () => {
        const { org } = await sut.execute({
            name: 'JavaScript Dogs',
            owners_name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
            whatsapp: '12213412341',
            cep: '51423142',
            state: 'Ceará',
            city: 'Pajuçara',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            org.password_hash,
        )
        expect(isPasswordCorrectlyHashed).toBe(true)

    })

    it('Should not be able to create org with same email', async () => {
        const email = 'jhondoe@exemple.com'

        await sut.execute({
            name: 'JavaScript Dogs',
            owners_name: 'John Doe',
            email,
            password: '123456',
            whatsapp: '12213412341',
            cep: '51423142',
            state: 'Ceará',
            city: 'Pajuçara',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })

        await expect(() =>
            sut.execute({
                name: 'JavaScript Dogs',
                owners_name: 'John Doe',
                email,
                password: '123456',
                whatsapp: '12213412341',
                cep: '51423142',
                state: 'Ceará',
                city: 'Pajuçara',
                street: 'Rua Paulo batista',
                latitude: -3.8613898,
                longitude: -38.582414,
            }),
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})