import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MovieModule} from './movie/movie.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {createTypeOrmConfig} from "./configs/typeorm.config";
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { PosterModule } from './poster/poster.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: createTypeOrmConfig,
            inject: [ConfigService]
        }),
        MovieModule,
        ReviewModule,
        ActorModule,
        PosterModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
