import {
    IsArray,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString, IsUrl, IsUUID, Matches,
    MaxLength,
    MinLength
} from "class-validator";
import {StartWith} from "../../shared/decorators/start-with.decorator";

export enum TaskTag {
    WORK = 'work',
    HOME = 'home',
    SCHOOL = 'school',
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    @StartWith('test')
        // @Length(3, 10) заменяет два верхних
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;

    // @IsNumber() просто число
    @IsInt() // целочисленное
    @IsOptional()
    @IsPositive()
    priority: number;

    @IsArray({message:"Тэги должны быть массивом"})
    @IsEnum(TaskTag,{message: "Invalid tag", each: true})
    @IsOptional()
    tags: TaskTag[];

    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {message: "Password must contain at least one uppercase letter, one lowercase letter and one number"})
    // password: string;
    //
    // @IsUrl()
    // url: string;
    //
    // @IsUUID('4', {message: 'Invalid UUID'})
    // uuid: string;
}