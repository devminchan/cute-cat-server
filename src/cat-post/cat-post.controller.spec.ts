import { Test, TestingModule } from '@nestjs/testing';
import { CatPostController } from './cat-post.controller';
import { CatPostService } from './cat-post.service';
import { PassportModule } from '@nestjs/passport';

describe('CatPost Controller', () => {
  let controller: CatPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
      controllers: [CatPostController],
      providers: [
        {
          provide: CatPostService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<CatPostController>(CatPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
