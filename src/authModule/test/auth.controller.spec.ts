import { Test, TestingModule } from '@nestjs/testing';
import { signupDto } from '../../authModule/dto/signup.dto';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { signinDto } from '../dto/signin.dto';
import { PrismaService } from '../../prismaModule/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('SignUp', () => {
    it('should call authService.signUp and return the result', async () => {
      // Arrange
      const signupDtoMock: signupDto = {
        email: 'test@gmail.com',
        password: 'test',
        first_name: 'test',
        last_name: 'test',
        image: 'test',
      };
      const expectedResult = {
        user: {
          id: 1,
          email: 'test@gmail.com',
          password: 'test',
          first_name: 'test',
          last_name: 'test',
          image: 'test',
        },
        token: 'test',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.SignUp(signupDtoMock);

      // Assert
      expect(authService.signUp).toHaveBeenCalledWith(signupDtoMock);
      expect(result).toBe(expectedResult);
    });
  });

  describe('SignIn', () => {
    it('should call authService.signIn and return the result', async () => {
      // Arrange
      const signinDtoMock: signinDto = {
        email: 'test@gmail.com',
        password: 'test',
      };
      const expectedResult = {
        user: {
          id: 1,
          email: 'test@gmail.com',
          password: 'test',
          first_name: 'test',
          last_name: 'test',
          image: 'test',
        },
        token: 'test',
      };
      jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.SignIn(signinDtoMock);

      // Assert
      expect(authService.signIn).toHaveBeenCalledWith(signinDtoMock);
      expect(result).toBe(expectedResult);
    });
  });

  describe('GetCurrentUser', () => {
    it('should call the GetOwner decorator and return the owner', () => {
      // Arrange
      const ownerMock = {
        email: 'test@gmail.com',
        password: 'test',
        first_name: 'test',
        last_name: 'test',
        image: 'test',
      };
      jest.spyOn(controller, 'GetCurrentUser').mockReturnValue(ownerMock);

      // Act
      const result = controller.GetCurrentUser(ownerMock);

      // Assert
      expect(result).toBe(ownerMock);
    });
  });
});
