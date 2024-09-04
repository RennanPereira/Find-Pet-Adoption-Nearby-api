import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org.use-case";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-repository";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { makeOrg } from "tests/factories/make-org.factory";

let orgsRepository: inMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new inMemoryOrgsRepository()
        sut = new CreateOrgUseCase(orgsRepository)
    })
    it('Should be able to create an org', async () => {

        const { org } = await sut.execute(makeOrg())
        expect(org.id).toEqual(expect.any(String))
    })

    it('Should hash password upon creation', async () => {
        const password = '123456'

        const { org } = await sut.execute(makeOrg({ password }))

        expect(await compare(password, org.password)).toBe(true)
        expect(await compare(password, orgsRepository.items[0].password)).toBe(true)

    })

    it('Should not be able to create org with same email', async () => {
        const email = 'jhondoe@exemple.com'
        orgsRepository.create(makeOrg({ email }))
        await expect(() =>
            sut.execute(makeOrg({ email }))
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})