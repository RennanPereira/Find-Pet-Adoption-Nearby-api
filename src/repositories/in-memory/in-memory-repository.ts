import { Org, Prisma } from "@prisma/client";
import { findManyNearbyParams, OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "utils/get-distance-between-coordinates";

export class inMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = []

    async findById(id: string) {
        const org = this.items.find((item) => item.id === id)

        if (!org) {
            return null
        }

        return org
    }

    async findByEmail(email: string) {
        const org = this.items.find((item) => item.email === email)

        if (!org) {
            return null
        }

        return org
    }

    async create(data: Prisma.OrgCreateInput) {
        const org = {
            id: randomUUID(),
            ...data,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
        }

        this.items.push(org)

        return org
    }

    async findManyNearby(params: findManyNearbyParams) {
        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber(),
                },
            )
            return distance < 10
        })
    }
}