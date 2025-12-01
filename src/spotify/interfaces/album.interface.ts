export interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    restrictions?: Restrictions;
    type: 'album';
    uri: string;
    artists: SpotifyArtist[];
    tracks: SpotifyTrackPage;
    copyrights: CopyrightInfo[];
    external_ids: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
}

/* --- Reusable Entities --- */

export interface ExternalUrls {
    spotify: string;
}

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface Restrictions {
    reason: string;
}

export interface SpotifyArtist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
}

/* --- Tracks --- */

export interface SpotifyTrackPage {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SpotifyTrack[];
}

export interface SpotifyTrack {
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: LinkedFrom;
    restrictions?: Restrictions;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

export interface LinkedFrom {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

/* --- Misc --- */

export interface CopyrightInfo {
    text: string;
    type: string;
}

export interface ExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
}