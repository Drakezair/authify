import { Module } from '@nestjs/common';
import { PrismaModule } from '../prismaModule/prisma.module';
import { ApplicationsController } from './application.controller';
import { ApplicationsService } from './application.service';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
