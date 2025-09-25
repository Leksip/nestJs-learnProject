import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, Req, Res} from '@nestjs/common';
import {MovieService} from './movie.service';
import type {Request, Response} from "express";
import {MovieDto} from "./dto/movie.dto";

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {
    }

    @Get('all')
    findAll(@Query('genre') genre: string) {
        return this.movieService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.movieService.findById(id);
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
    create(@Body() dto: MovieDto) {
        return this.movieService.create(dto)
    }

    @Patch("update/:id")
    update(@Body() dto: MovieDto, @Param('id') id: string) {
        return this.movieService.update(id, dto)
    }

    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.movieService.delete(id)
    }

}
