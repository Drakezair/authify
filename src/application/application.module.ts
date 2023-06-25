import { Module } from '@nestjs/common';
import { PrismaModule } from '../prismaModule/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApplicationController } from './application.controller';
import { AuthService } from '../authModule/auth.service';
import { JwtStrategy } from 'src/authModule/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ApplicationController],
  providers: [AuthService, JwtStrategy],
})
export class ApplicationModule {}
