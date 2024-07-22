import * as bcrypt from 'bcrypt';
import { CreateUserUseCase } from '../user/user.use-case';
import { CreateUserDto } from '../../../applications/dtos/create-user.dto';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepository: any;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      checkEmail: jest.fn(),
    };

    useCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should create a new user', async () => {
    const args: CreateUserDto = {
      email: 'user@example.com',
      password: 'password',
      username: 'John Doe',
    };

    const hashedPassword = 'hashed_password';

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    mockUserRepository.checkEmail.mockResolvedValue(false);
    mockUserRepository.create.mockResolvedValue({
      ...args,
      password: hashedPassword,
    });

    const result = await useCase.create(args);

    expect(result).toEqual({
      ...args,
      password: hashedPassword,
    });
    expect(mockUserRepository.checkEmail).toHaveBeenCalledWith(args.email);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      ...args,
      password: hashedPassword,
    });
  });

  it('should throw an error if repository create fails', async () => {
    const args: CreateUserDto = {
      email: 'user@example.com',
      password: 'password',
      username: 'John Doe',
    };

    const hashedPassword = 'hashed_password';

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    mockUserRepository.checkEmail.mockResolvedValue(false);
    mockUserRepository.create.mockRejectedValue(
      new Error('Failed to create user'),
    );

    await expect(useCase.create(args)).rejects.toThrow('Failed to create user');
  });
});
