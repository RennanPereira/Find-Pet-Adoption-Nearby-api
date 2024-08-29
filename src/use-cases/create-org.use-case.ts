import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
    name: string
    owners_name: string
    email: string
    password: string
    whatsapp: string
    cep: string
    state: string
    city: string
    street: string
    latitude: number
    longitude: number
}

interface CreateOrgUseCaseResponse {
    org: Org
}

export class CreateOrgUseCase {
    constructor(private orgsRepository: any) { }

    async execute({
        name,
        owners_name,
        email,
        password,
        whatsapp,
        cep,
        state,
        city,
        street,
        latitude,
        longitude,
    }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const orgsByEmail = await this.orgsRepository.findByEmail(email)

        if (orgsByEmail) {
            throw new OrgAlreadyExistsError()
        }

        const org = await this.orgsRepository.create({
            name,
            owners_name,
            email,
            password: password_hash,
            whatsapp,
            cep,
            state,
            city,
            street,
            latitude,
            longitude,
        })

        return {
            org,
        }
    }
}
