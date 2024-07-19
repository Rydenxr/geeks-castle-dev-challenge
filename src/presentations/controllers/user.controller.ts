import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from 'src/applications/use-cases/user/user.use-case';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('USERS')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() args: CreateUserDto) {
    return await this.createUserUseCase.create(args);
  }
}
