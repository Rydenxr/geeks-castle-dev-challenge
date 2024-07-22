import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../applications/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/applications/use-cases/user/user.use-case';

@Controller('users')
@ApiTags('USERS')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  createUser(@Body() args: CreateUserDto) {
    return this.createUserUseCase.create(args);
  }
}
