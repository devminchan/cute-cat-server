import { Test, TestingModule } from '@nestjs/testing';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';
import { PassportModule } from '@nestjs/passport';

describe('Utils Controller', () => {
  let controller: UtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
      controllers: [UtilsController],
      providers: [
        {
          provide: UtilsService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<UtilsController>(UtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
