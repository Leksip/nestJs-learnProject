import {Body, Controller, Get, Headers, Post, Query, Req, Res} from '@nestjs/common';
import {MovieService} from './movie.service';
import type { Request, Response} from "express";

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {
    }

    @Get('all')
    findAll(@Query('genre') genre: string) {
        return this.movieService.findAll(genre);
    }

    @Get('headers')
    getHeaders(@Headers() headers: any) {
        return headers;
    }

    @Get('user-agent')
    getUserAgent(@Headers('user-agent') userAgent: string) {
        return {userAgent};
    }

    @Get('request')
    getRequest(@Req() req: Request) {
        return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query,
        };
    }

    @Get('response')
    getResponse(@Res() res: Response) {
        return res.status(201).send('Hello');
    }

    @Post()
    create(@Body('title') title: string) {
        return `Фильм ${title} был добавлен`
    }
}
