import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING), ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
