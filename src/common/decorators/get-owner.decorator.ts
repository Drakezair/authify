import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { prisma } from '../lib/prisma';

export const GetOwner = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { ownerId } = request.user;
    const owner = await prisma.owner.findUnique({ where: { id: ownerId } });
    delete owner.password;
    return owner;
  },
);
