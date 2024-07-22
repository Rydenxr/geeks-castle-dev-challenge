import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../applications/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/applications/use-cases/user/user.use-case';

@Controller('users')
@ApiTags('USERS')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() args: CreateUserDto) {
    return await this.createUserUseCase.create(args);
  }
}
