import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authModule/wt-auth.guard';
import { GetOwner } from 'src/common/decorators/get-owner.decorator';

@Controller('application')
export class ApplicationController {
  @Post('/')
  @UseGuards(JwtAuthGuard)
  createApplication(@GetOwner() owner, @Body() body) {
    return 'hola';
  }
}
