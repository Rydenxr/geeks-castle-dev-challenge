import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../domains/repositories/user.repository';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ICreateUserUseCase } from '../interfaces/user-use-case.interface';
import { USER_REPOSITORY_TOKEN } from '../../../domains/repositories/repository.tokens';
import { DatabaseError } from 'src/infrastructures/exceptions/database-error';

Injectable();
export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly saltRounds = 10;

  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async create(args: CreateUserDto) {
    try {
      let { password } = args;

      if (await this.userRepository.checkEmail(args.email)) {
        throw new ConflictException('Email already in use');
      }

      if (!password) {
        password = this.generateStrongPassword();
      }

      const hashedPassword = await this.hashPassword(password);

      const userData = {
        username: args.username,
        email: args.email,
        password: hashedPassword,
      };

      return await this.userRepository.create(userData);
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw new Error('An error has ocurred');
      }
      throw error;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  private generateStrongPassword(length: number = 16): string {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
  }
}
