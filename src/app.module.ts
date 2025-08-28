import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MovieModule } from './movie/movie.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5433,
    username:"root",
    password:"<PASSWORD>",
    database:"nestjs-course",
    autoLoadEntities:true,
    synchronize:true,
  }) ,TasksModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
