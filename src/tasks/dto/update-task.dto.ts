import {IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateTaskDto {
    @IsString({message: 'Эээ, чурка, валыну убери'})
    @IsNotEmpty()
    @MinLength(3, {message: "Маловато, от 3 и более"})
    @MaxLength(10, {message: "Не борщи, 10 максимум"})
    title: string;
    description: string;
    @IsBoolean()
    isDone: boolean;
}