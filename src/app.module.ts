import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'qzqgbckb',
    host: 'tyke.db.elephantsql.com',
    username: 'qzqgbckb',
    password: 'MW5KJ4IPetGJ8aJ-SXRNVrIzC1NoO1D7',
    entities: ['**/*.entity.ts'],
    synchronize: false
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
