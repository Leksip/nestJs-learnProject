import {IsNotEmpty, IsString, Length, IsOptional} from "class-validator";

export class ActorDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @Length(1, 64, { message: 'Name must be between 1 and 64 characters' })
    name: string;
}
