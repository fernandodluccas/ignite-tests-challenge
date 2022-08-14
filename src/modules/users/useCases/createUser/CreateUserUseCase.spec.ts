import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

const userMock = {
  name: 'John Doe',
  email: 'test@test.com',
  password: '123456',
};

describe('User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should create a user', async () => {
    const user = await createUserUseCase.execute(userMock);

    expect(user).toHaveProperty('id');
  });

  it('should not create a user if email already exists', async () => {
    await createUserUseCase.execute(userMock);

    await expect(createUserUseCase.execute(userMock)).rejects.toBeInstanceOf(
      CreateUserError
    );
  });

  it('should find a user by id', async () => {
    const user = await createUserUseCase.execute(userMock);

    expect(user).toHaveProperty('id');

    const foundUser = await usersRepositoryInMemory.findById(user.id!);

    expect(foundUser).toBeDefined();
  });
});
