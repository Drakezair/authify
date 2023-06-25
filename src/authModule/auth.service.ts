import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { comparePassword, encryptPassword } from '../common/utils/crypto';
import { PrismaService } from '../prismaModule/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(body) {
    const encryptedPassword = await encryptPassword(body.password);
    const alreadyExist = await this.prisma.owner.findUnique({
      where: { email: body.email },
    });

    if (alreadyExist) {
      throw new HttpException('User already exist', HttpStatus.FORBIDDEN);
    }

    console.log(encryptedPassword);

    const owner = await this.prisma.owner.create({
      data: { ...body, password: encryptedPassword },
    });

    const payload = { ownerId: owner.id };
    const token = await this.jwtService.signAsync(payload);

    delete owner.password;

    return { user: owner, token };
  }

  async signIn(body) {
    const owner = await this.prisma.owner.findUniqueOrThrow({
      where: { email: body.email },
    });

    if (!owner)
      throw new HttpException('Invalid credential', HttpStatus.FORBIDDEN);

    const isPasswordValid = await comparePassword(
      body.password,
      owner.password,
    );

    if (!isPasswordValid)
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);

    const payload = { ownerId: owner.id };
    const token = await this.jwtService.signAsync(payload);

    delete owner.password;

    return { user: owner, token };
  }
}
