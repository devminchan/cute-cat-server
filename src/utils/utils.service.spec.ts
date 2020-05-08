import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KeyValueRepository } from './keyvalue.repsitory';
import { KeyValue } from './keyvalue.entity';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilsService,
        {
          provide: getRepositoryToken(KeyValue),
          useClass: KeyValueRepository,
        },
      ],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
