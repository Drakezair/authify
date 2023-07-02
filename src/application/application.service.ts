import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaModule/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async createApplication(owner, body) {
    const application = await this.prisma.application.create({
      data: {
        ...body,
        owner: { connect: { id: owner.id } },
      },
    });

    return application;
  }

  async getApplications(owner) {
    const applications = await this.prisma.application.findMany({
      where: { userId: owner.id },
      include: {
        owner: {
          select: { id: true, first_name: true, last_name: true },
        },
      },
    });

    return applications;
  }

  async getApplicationById(id, owner) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, first_name: true, last_name: true },
        },
      },
    });

    if (!application)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    if (application.userId !== owner.id)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return application;
  }
}
