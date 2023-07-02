import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authModule/wt-auth.guard';
import { GetOwner } from 'src/common/decorators/get-owner.decorator';
import { ApplicationsService } from './application.service';
import { createApplicationDto } from './dto/create_application.dto';

@Controller('application')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  createApplication(@GetOwner() owner, @Body() body: createApplicationDto) {
    return this.applicationsService.createApplication(owner, body);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getApplications(@GetOwner() owner) {
    return this.applicationsService.getApplications(owner);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getApplicationById(@GetOwner() owner, @Param('id') id: string) {
    return this.applicationsService.getApplicationById(parseInt(id), owner);
  }
}
