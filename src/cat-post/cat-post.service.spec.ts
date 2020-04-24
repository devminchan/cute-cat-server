import { Test, TestingModule } from '@nestjs/testing';
import { CatPostService } from './cat-post.service';

describe('CatPostService', () => {
  let service: CatPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatPostService],
    }).compile();

    service = module.get<CatPostService>(CatPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
