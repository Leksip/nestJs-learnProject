import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class LoginInput {

    @Field(() => String)
    @IsString({message: "Почта должна быть строкой"})
    @IsNotEmpty({message: "Почта обязательна для заполнения"})
    @IsEmail({}, {message: "Некорректный формат электронной почты"})
    email: string;

    @Field(() => String)
    @IsString({message: "Пароль должен быть строкой"})
    @IsNotEmpty({message: "Пароль обязателен для заполнения"})
    @Length(6, 128, {message: "Длинна пароля должна быть от 6 до 128 символов"})
    password: string;
}