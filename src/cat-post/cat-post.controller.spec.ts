import { Test, TestingModule } from '@nestjs/testing';
import { CatPostController } from './cat-post.controller';

describe('CatPost Controller', () => {
  let controller: CatPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatPostController],
    }).compile();

    controller = module.get<CatPostController>(CatPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
