import { Module } from '@nestjs/common';
import { CustomerModule } from './use-cases/customer/customer.module';
import { UserModule } from './use-cases/user/user.module';

@Module({
  imports: [CustomerModule, UserModule],
})
export class ApplicationsModule {}
