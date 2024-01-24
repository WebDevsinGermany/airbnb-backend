import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationModule } from './accommodation/accommodation.module';
import dbConfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig as any), AccommodationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
