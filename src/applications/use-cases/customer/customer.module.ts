import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructures/infrastructure.module';
import { CreateCustomerUseCase } from './customer.use-case';
import { CustomerRepositoryImpl } from 'src/infrastructures/repositories/customer.repository.impl';
import { CustomerController } from 'src/presentations/controllers/customer.controller';
import { CUSTOMER_REPOSITORY_TOKEN } from 'src/domains/repositories/tokens.repository';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateCustomerUseCase,
    {
      provide: CUSTOMER_REPOSITORY_TOKEN,
      useClass: CustomerRepositoryImpl,
    },
  ],
  exports: [CreateCustomerUseCase],
  controllers: [CustomerController],
})
export class CustomerModule {}
