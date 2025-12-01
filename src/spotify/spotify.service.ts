import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {AuthResponse} from "./interfaces/auth-response.interface";
import {Artist} from "./interfaces/artist.interface";
import {SpotifyAlbum} from "./interfaces/album.interface";
import {SpotifyOptionsSymbol} from "./interfaces/spotify-options.interface";
import type {SpotifyOptions} from "./interfaces/spotify-options.interface";

@Injectable()
export class SpotifyService {
    private accessToken: string | null;
    private tokenExpiration: number = 0;


    constructor(
        @Inject(SpotifyOptionsSymbol) private options: SpotifyOptions,
        private readonly httpService: HttpService,
    ) {
        console.log(options);
    }

    public async getArtist(id: string): Promise<Artist> {
        await this.auth();

        const response = await firstValueFrom(this.httpService.get<Artist>(
            `https://api.spotify.com/v1/artists/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }))

        return response.data;
    }

    public async getAlbum(id: string): Promise<SpotifyAlbum> {
        await this.auth();

        const response = await firstValueFrom(this.httpService.get<SpotifyAlbum>(
            `https://api.spotify.com/v1/albums/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            }))

        return response.data;
    }

    private async auth(): Promise<void> {
        if (this.accessToken && this.tokenExpiration > Date.now()) return;

        const creds = Buffer.from(`${this.options.clientId}:${this.options.clientSecret}`).toString('base64');

        const response = await firstValueFrom(this.httpService.post<AuthResponse>(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${creds}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }))

        this.accessToken = response.data.access_token;
        this.tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    }
}
