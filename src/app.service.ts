import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service';
import { Artist } from './spotify/interfaces/artist.interface';
import { SpotifyAlbum } from './spotify/interfaces/album.interface';

export type SimplifiedAlbum = Omit<Partial<SpotifyAlbum>, 'tracks'> & {
    tracks: Array<{ id: string; name: string }>;
};

@Injectable()
export class AppService {
    constructor(private readonly spotifyService: SpotifyService) {
    }

    async getArtist(id: string): Promise<Artist> {
        return await this.spotifyService.getArtist(id);
    }

    async getAlbum(id: string): Promise<SimplifiedAlbum> {
        const album = await this.spotifyService.getAlbum(id);

        return {
            id: album.id,
            name: album.name,
            release_date: album.release_date,
            images: album.images,
            tracks: album.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
            })),
        };
    }
}
