import { faker, fakerLV } from "@faker-js/faker"
import crypto from "node:crypto"

type Overwrite = {
    password?: string
    email?: string
    latitude?: number
    longitude?: number
}

export function makeOrg(overwrite?: Overwrite) {
    return {
        id: crypto.randomUUID(),
        name: faker.company.name(),
        owners_name: faker.person.fullName(),
        email: overwrite?.email ?? faker.internet.email(),
        password: overwrite?.password ?? faker.internet.password(),
        whatsapp: faker.phone.number(),
        cep: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.street(),
        latitude: overwrite?.latitude ?? faker.location.latitude(),
        longitude: overwrite?.longitude ?? faker.location.longitude(),
    }
}