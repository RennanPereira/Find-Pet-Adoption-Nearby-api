import { prisma } from '@/lib/prisma'
import { Prisma, Org } from '@prisma/client'

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })
    return org
  }

}
