import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('return new user when user created', async () => {
    jest.spyOn(repository, 'create').mockImplementationOnce(u => {
      const newUser = u as User;
      newUser.seqNo = 1;
      newUser.isAdmin = false;

      return newUser;
    });

    jest.spyOn(repository, 'save').mockImplementationOnce(u => {
      return Promise.resolve(u as User);
    });

    const result = await service.createUser({
      userId: 'userId',
      password: 'password',
    });

    expect(result.userId).toBe('userId');
    expect(result.password).not.toBe('password');
    expect(result.seqNo).toBe(1);
    expect(result.isAdmin).toBe(false);
  });
});
