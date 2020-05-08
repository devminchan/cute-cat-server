import { Test, TestingModule } from '@nestjs/testing';
import { CatPostService } from './cat-post.service';
import { CatPostRepository } from './cat-post.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils/utils.service';
import { HttpService } from '@nestjs/common';

describe('CatPostService', () => {
  let service: CatPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatPostService,
        {
          provide: getRepositoryToken(CatPostRepository),
          useClass: CatPostRepository,
        },
        {
          provide: UserService,
          useFactory: () => ({}),
        },
        {
          provide: UtilsService,
          useFactory: () => ({}),
        },
        {
          provide: HttpService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    service = module.get<CatPostService>(CatPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
