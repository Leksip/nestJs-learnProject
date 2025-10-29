import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterRequestDto} from "./dto/register.dto";
import {LoginRequestDto} from "./dto/login.dto";
import type {Request, Response} from "express";
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {AuthResponseDto} from "./dto/auth.dto";
import {Authorization} from "./decorators/authorization.decorator";
import {Authorized} from "./decorators/authorized.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({
        summary: "Регистрация нового пользователя"
    })
    @ApiOkResponse({
        type: AuthResponseDto
    })
    @ApiBadRequestResponse({
        description: "Invalid data"
    })
    @ApiConflictResponse({
        description: "Пользователь с такой почтой уже существует"
    })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Res({passthrough: true}) res: Response,
        @Body() dto: RegisterRequestDto
    ) {
        return await this.authService.register(res, dto)
    }


    @ApiOperation({
        summary: "Вход в систему"
    })
    @ApiOkResponse({
        type: AuthResponseDto
    })
    @ApiBadRequestResponse({
        description: "Invalid data"
    })
    @ApiNotFoundResponse({
        description: "Пользователь не найден"
    })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Res({passthrough: true}) res: Response,
        @Body() dto: LoginRequestDto
    ) {
        return await this.authService.login(res, dto)
    }


    @ApiOkResponse({
        type: AuthResponseDto
    })
    @ApiUnauthorizedResponse({
        description: "Невалидный refresh-токен"
    })
    @ApiOperation({
        summary: "Рефреш access-токена"
    })
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
        @Res({passthrough: true}) res: Response,
        @Req() req: Request,
    ) {
        return await this.authService.refresh(res, req)
    }

    @ApiOperation({
        summary: "Выход из системы"
    })
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logOut(
        @Res({passthrough: true}) res: Response,
    ) {
        return await this.authService.logOut(res)
    }


    @Authorization()
    @Get('me')
    @HttpCode(HttpStatus.OK)
    async me(
        @Authorized('id') id: string
    ) {
        return {id}
    }
}
