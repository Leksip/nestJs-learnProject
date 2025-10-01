import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MovieModule} from './movie/movie.module';
import {ConfigModule} from "@nestjs/config";
import {ReviewModule} from './review/review.module';
import {ActorModule} from './actor/actor.module';
import {PosterModule} from './poster/poster.module';
import {PrismaModule} from './prisma/prisma.module';
import {LoggerMiddleware} from "./common/middlewares/logger/logger.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        MovieModule,
        ReviewModule,
        ActorModule,
        PosterModule,
        PrismaModule
    ],
    controllers: [AppController],
    providers: [AppService,],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({path:'/movie/all', method: RequestMethod.GET});
    }
}
