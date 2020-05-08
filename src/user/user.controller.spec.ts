import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';

describe('User Controller', () => {
  let controller: UserController;
  // let mockService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // mockService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
