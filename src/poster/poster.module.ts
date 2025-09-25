import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PosterEntity} from "./entities/poster.entity";
import {ActorEntity} from "../actor/entities/actor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PosterEntity])],
  controllers: [PosterController],
  providers: [PosterService],
})
export class PosterModule {}
