import {Controller, Get, Param} from '@nestjs/common';
import {AppService, SimplifiedAlbum} from './app.service';
import {Artist} from "./spotify/interfaces/artist.interface";
import {SpotifyAlbum} from "./spotify/interfaces/album.interface";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/artist/:id')
    async getArtist(@Param('id') id: string): Promise<Artist> {
        return this.appService.getArtist(id);
    }

    @Get('/album/:id')
    async getAlbum(@Param('id') id: string): Promise<SimplifiedAlbum> {
        return this.appService.getAlbum(id);
    }

}
