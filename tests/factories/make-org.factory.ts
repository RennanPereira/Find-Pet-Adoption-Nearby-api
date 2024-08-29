import { faker, fakerLV } from "@faker-js/faker"
import { randomUUID } from "crypto"

type Overwrite = {
    password?: string
    email?: string
}

export function makeOrg(overwrite?: Overwrite) {
    return {
        id: randomUUID(),
        name: faker.company.name(),
        owners_name: faker.person.fullName(),
        email: overwrite?.email ?? faker.internet.email(),
        password: overwrite?.password ?? faker.internet.password(),
        whatsapp: faker.phone.number(),
        cep: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.street(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
    }
}