import {IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min} from "class-validator";
import {Genre} from "../entities/movie.entity";

export class MovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1980)
    @Max(new Date().getFullYear())
    releaseYear: number;

    @IsNotEmpty()
    @IsEnum(Genre,{message: "Invalid Genre", each: true})
    genre: Genre;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsNotEmpty()
    @IsArray()
    @IsUUID('4', {each: true})
    actorIds: string[];
}
