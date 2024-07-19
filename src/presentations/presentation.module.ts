import { Module } from '@nestjs/common';
import { ApplicationsModule } from 'src/applications/application.module';
import { CustomerController } from './controllers/customer.controller';
import { UserController } from './controllers/user.controller';
import { CustomerModule } from 'src/applications/use-cases/customer/customer.module';
import { UserModule } from 'src/applications/use-cases/user/user.module';

@Module({
  imports: [ApplicationsModule, CustomerModule, UserModule],
  controllers: [CustomerController, UserController],
})
export class PresentationsModule {}
