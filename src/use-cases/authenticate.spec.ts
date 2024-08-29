import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: inMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new inMemoryOrgsRepository()
        sut = new AuthenticateUseCase(orgsRepository)
    })
    it('Should be able to authenticate', async () => {
        await orgsRepository.create({
            name: 'JavaScript Dogs',
            owners_name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: await hash('123456', 6),
            whatsapp: '12213412341',
            cep: '51423142',
            state: 'Ceará',
            city: 'Pajuçara',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })

        const { org } = await sut.execute({
            email: 'johndoe@exemple.com',
            password: '123456',
        })
        expect(org.id).toEqual(expect.any(String))
    })

    it('Should not able to authenticate with wrong password', async () => {
        await orgsRepository.create({
            name: 'JavaScript Dogs',
            owners_name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: await hash('123456', 6),
            whatsapp: '12213412341',
            cep: '51423142',
            state: 'Ceará',
            city: 'Pajuçara',
            street: 'Rua Paulo batista',
            latitude: -3.8613898,
            longitude: -38.582414,
        })

        expect(() =>
            sut.execute({
                email: 'johndoe@exemple.com',
                password: '111111',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})