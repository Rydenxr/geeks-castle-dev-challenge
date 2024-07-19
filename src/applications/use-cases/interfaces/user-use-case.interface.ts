import { User } from 'src/domains/entities/user.entity';
import { CreateUserDto } from 'src/presentations/dtos/create-user.dto';

export interface ICreateUserUseCase {
  create(args: CreateUserDto): Promise<User>;
}
