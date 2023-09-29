import { Test, TestingModule } from '@nestjs/testing';
import { ContohControllerController } from './contoh-controller.controller';

describe('ContohControllerController', () => {
  let controller: ContohControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContohControllerController],
    }).compile();

    controller = module.get<ContohControllerController>(ContohControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
