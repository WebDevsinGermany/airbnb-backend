import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig as any)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
