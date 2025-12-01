import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PrismaModule} from './prisma/prisma.module';
import {SpotifyModule} from './spotify/spotify.module';
import {getSpotifyConfig} from "./config/spotify.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        PrismaModule,
        // SpotifyModule.forRoot({
        //     clientSecret: 'cfcd8e467b724db99bc919588d57ce07',
        //     clientId: 'c97fb2f4a00f4e47bdf8b59cd7e50b63'
        // }),
        SpotifyModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: getSpotifyConfig,
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
