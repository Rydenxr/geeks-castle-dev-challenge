import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './infrastructures/database/firebase.module';
import { PresentationsModule } from './presentations/presentation.module';
import { ApplicationsModule } from './applications/application.module';
import { CustomerModule } from './applications/use-cases/customer/customer.module';
import { UserModule } from './applications/use-cases/user/user.module';
import { InfrastructureModule } from './infrastructures/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    PresentationsModule,
    ApplicationsModule,
    CustomerModule,
    InfrastructureModule,
    UserModule,
  ],
})
export class AppModule {}
