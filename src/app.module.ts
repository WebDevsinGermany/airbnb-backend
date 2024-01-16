import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const dbConfig = require('../ormconfig.js');
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
