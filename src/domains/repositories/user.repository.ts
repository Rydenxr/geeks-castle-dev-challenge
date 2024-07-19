import { CreateUserDto } from 'src/presentations/dtos/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: CreateUserDto): Promise<User>;
  checkEmail(email: string): Promise<boolean>;
}
