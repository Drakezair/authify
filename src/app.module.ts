import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationController } from './application/application.controller';
import { AuthModule } from './authModule/auth.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [AuthModule, ApplicationModule],
  controllers: [AppController, ApplicationController],
  providers: [AppService],
})
export class AppModule {}
