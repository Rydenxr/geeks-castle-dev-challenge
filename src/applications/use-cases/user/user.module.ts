import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructures/infrastructure.module';
import { CreateUserUseCase } from './user.use-case';
import { USER_REPOSITORY_TOKEN } from 'src/domains/repositories/repository.tokens';
import { UserRepositoryImpl } from 'src/infrastructures/repositories/user.repository.impl';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUserUseCase],
})
export class UserModule {}
