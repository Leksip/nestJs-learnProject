import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReviewEntity} from "./entities/review.entity";
import {MovieService} from "../movie/movie.service";
import {MovieEntity} from "../movie/entities/movie.entity";
import {ActorEntity} from "../actor/entities/actor.entity";
import {PosterEntity} from "../poster/entities/poster.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, MovieEntity, ActorEntity, PosterEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}
