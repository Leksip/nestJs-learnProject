import {Controller, Get, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "./common/guards/auth.guard";
import {UserAgent} from "./common/decorators/user-agent.decorator";
import {ApiHeader, ApiTags} from "@nestjs/swagger";

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getProfile(@UserAgent() userAgent: string) {
        return {
            name: 'John',
            age: 30,
            userAgent,
        };
    }
}
