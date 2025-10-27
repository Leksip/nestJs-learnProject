import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {MovieService} from './movie.service';
import {MovieDto} from "./dto/movie.dto";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Genre} from "generated/prisma";

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {
    }

    @ApiOperation({
        summary: 'Get all movies',
        description: 'Get all movies with optional genre filter',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The movies have been successfully retrieved.',
    })
    @ApiQuery({
        name: 'genre',
        required: false,
        enum: Genre,
        description: 'Filter movies by genre',
    })
    @Get('all')
    findAll(@Query('genre') genre?: Genre | undefined) {
        return this.movieService.findAll(genre);
    }


    // @ApiParam({
    //     name: 'id',
    //     description: 'The id of the movie',
    //     required: true,
    //     type: String,
    // })
    @ApiOperation({
        summary: 'Get one movie by id',
        description: 'Get one movie',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The movie has been successfully retrieved.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Movie not found',
    })
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.movieService.findById(id, false);
    }

    // @Get('headers')
    // getHeaders(@Headers() headers: any) {
    //     return headers;
    // }
    //
    // @Get('user-agent')
    // getUserAgent(@Headers('user-agent') userAgent: string) {
    //     return {userAgent};
    // }
    //
    // @Get('request')
    // getRequest(@Req() req: Request) {
    //     return {
    //         method: req.method,
    //         url: req.url,
    //         headers: req.headers,
    //         body: req.body,
    //         params: req.params,
    //         query: req.query,
    //     };
    // }
    //
    // @Get('response')
    // getResponse(@Res() res: Response) {
    //     return res.status(201).send('Hello');
    // }


    // @ApiBody({
    //     schema:{
    //         type: 'object',
    //         properties: {
    //             title: {type: 'string', example: 'The Matrix'},
    //             actorIds: {type: 'array', items: {type: 'string'}},
    //             releaseYear: {type: 'number', example: 2001},
    //             genre: {type: 'enum', enum: ['Action', 'Comedy', 'Drama'],},
    //             imageUrl: {type: 'string'},
    //         }
    //     }
    // })
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
