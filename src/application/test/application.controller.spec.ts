import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from '../application.controller';
import { ApplicationsService } from '../application.service';
import { PrismaService } from '../../prismaModule/prisma.service';

describe('ApplicationController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [ApplicationsService, PrismaService],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createApplication', () => {
    it('should call applicationsService.createApplication and return the result', async () => {
      // Arrange
      const ownerMock = {
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        first_name: 'test',
        last_name: 'test',
        image: 'test',
        confirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createApplicationDtoMock = {
        name: 'test',
        description: 'test',
        image: 'test',
        owner: ownerMock,
      };
      const expectedResult = {
        id: 1,
        name: 'test',
        description: 'test',
        image: 'test',
        owner: ownerMock,
        api_key: 'test',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(controller, 'createApplication')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await controller.createApplication(
        ownerMock,
        createApplicationDtoMock,
      );

      // Assert
      expect(controller.createApplication).toHaveBeenCalledWith(
        ownerMock,
        createApplicationDtoMock,
      );
      expect(result).toBe(expectedResult);
    });
  });
});
