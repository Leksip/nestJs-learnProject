import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from './prisma/prisma.module';
import {ChatModule} from './chat/chat.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        PrismaModule,
        ChatModule
    ],
    controllers: [AppController],
    providers: [AppService,],
})
export class AppModule {
}
