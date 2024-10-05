import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING), 
    ProfileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
