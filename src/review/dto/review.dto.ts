import {IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min} from "class-validator";

export class ReviewDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(10)
    rating: number

    @IsUUID('4')
    @IsNotEmpty()
    movieId: string

}
