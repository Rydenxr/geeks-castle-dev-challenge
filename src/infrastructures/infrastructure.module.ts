import { Module } from '@nestjs/common';
import { FirebaseService } from './database/firebase.service';

import { CustomerRepositoryImpl } from './repositories/customer.repository.impl';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import {
  CUSTOMER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/domains/repositories/tokens.repository';

@Module({
  providers: [
    FirebaseService,
    {
      provide: CUSTOMER_REPOSITORY_TOKEN,
      useClass: CustomerRepositoryImpl,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [FirebaseService, CUSTOMER_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN],
})
export class InfrastructureModule {}
