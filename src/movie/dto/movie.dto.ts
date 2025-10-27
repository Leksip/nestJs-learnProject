import {IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min} from "class-validator";
import { Genre } from "generated/prisma";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";


export class MovieDto {
    @ApiProperty({example: 'The Shawshank Redemption', description: 'The title of the movie', type: String})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: '1994', description: 'The release year of the movie', type: Number})
    @IsNotEmpty()
    @IsInt()
    @Min(1980)
    @Max(new Date().getFullYear())
    releaseYear: number;

    @ApiProperty({example: 'Action', description: 'The genre of the movie', enum: Genre})
    @IsNotEmpty()
    @IsEnum(Genre,{message: "Invalid Genre", each: true})
    genre: Genre;

    @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'The URL of the movie poster', type: String})
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiProperty({example: ['1', '2', '3'], description: 'The IDs of the actors', type: [String]})
    @IsNotEmpty()
    @IsArray()
    @IsUUID('4', {each: true})
    actorIds: string[];
}
