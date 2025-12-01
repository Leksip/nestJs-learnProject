import {ConfigService} from "@nestjs/config";
import type {SpotifyOptions} from "../spotify/interfaces/spotify-options.interface";

export function getSpotifyConfig(configService: ConfigService): SpotifyOptions {
    return {
        clientSecret: configService.getOrThrow('SPOTIFY_CLIENT_SECRET'),
        clientId: configService.getOrThrow('SPOTIFY_CLIENT_ID')
    }
}