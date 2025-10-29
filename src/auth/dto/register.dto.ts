import {IsEmail, IsNotEmpty, IsString, Length, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterRequestDto {
    @ApiProperty({
        description:"Почта пользователя",
        example: "test@gmail.com"
    })
    @IsString({message: "Почта должна быть строкой"})
    @IsNotEmpty({message: "Почта обязательна для заполнения"})
    @IsEmail({}, {message: "Некорректный формат электронной почты"})
    email: string;

    @ApiProperty({
        description:"Пароль пользователя",
        example: "123456",
        minLength: 6,
        maxLength: 128,
    })
    @IsString({message: "Пароль должен быть строкой"})
    @IsNotEmpty({message: "Пароль обязателен для заполнения"})
    @Length(6, 128, {message: "Длинна пароля должна быть от 6 до 128 символов"})
    password: string;


    @ApiProperty({
        description:"Имя пользователя",
        example: "Иван",
        maxLength: 50,
    })
    @IsString({message: "Имя должно быть строкой"})
    @IsNotEmpty({message: "Имя обязательно для заполнения"})
    @MaxLength(50, {message: "Длинна имени не должна превышать 50 символов"})
    name: string;
}