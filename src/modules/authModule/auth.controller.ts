import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from '../../modules/authModule/dto/signup.dto';
import { PrismaClientExceptionFilter } from '../prismaModule/prisma-client-exception.filter';
import { ApiOperation } from '@nestjs/swagger';
import { signinDto } from './dto/signin.dto';
import { JwtAuthGuard } from './wt-auth.guard';
import { GetOwner } from '../../common/decorators/get-owner.decorator';

@Controller('auth')
@UseFilters(PrismaClientExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create an user of authify' })
  SignUp(@Body() body: signupDto) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Create an user of authify' })
  SignIn(@Body() body: signinDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  GetCurrentUser(@GetOwner() owner) {
    return owner;
  }
}
