import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './infrastructures/database/firebase.module';
import { PresentationsModule } from './presentations/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    PresentationsModule,
  ],
})
export class AppModule {}
