import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {hash, verify} from "argon2";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import type {JwtPayload} from "./interfaces/jwt.interface";
import type {Request, Response} from "express";
import {isDev} from "../utils/is-dev.utils";
import {RegisterInput} from "./inputs/register.input";
import {LoginInput} from "./inputs/login.input";

@Injectable()
export class AuthService {
    private readonly JWT_ACCESS_TOKEN_TTL: string
    private readonly JWT_REFRESH_TOKEN_TTL: string

    private readonly COOKIE_DOMAIN: string


    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL')
        this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL')
        this.COOKIE_DOMAIN = this.configService.getOrThrow('COOKIE_DOMAIN')
    }

    public async register(res: Response, input: RegisterInput) {
        const {name, email, password} = input;

        const existUser = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        })

        if (existUser) {
            throw new ConflictException('Пользователь с такой почтой уже существует');
        }

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: await hash(password),
            }
        })

        return this.auth(res, user.id)
    }


    async login(res: Response, dto: LoginInput) {
        const {email, password} = dto;

        const user = await this.prismaService.user.findUnique({
                where: {
                    email,
                },
                select: {
                    id: true,
                    password: true,
                }
            }
        )

        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }

        const isValidPassword = await verify(user.password, password)

        if (!isValidPassword) {
            throw new NotFoundException('Пользователь не найден')
        }


        return this.auth(res, user.id)
    }

    async logOut(res: Response) {
        this.setCookies(res, 'refresh-token', new Date(0))
        return true
    }


    private generateTokens(id: string) {
        const payload: JwtPayload = {id}

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL as any
        })
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL as any
        })

        return {accessToken, refreshToken}
    }


    private setCookies(res: Response, token: string, exp: Date) {
        res.cookie('refresh-token', token, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires: exp,
            secure: !isDev(this.configService),
            sameSite: 'lax',
        })
    }

    async refresh(res: Response, req: Request) {
        const refreshToken = req.cookies['refresh-token']

        if (!refreshToken) {
            throw new UnauthorizedException('Невалидный refresh-токен')
        }

        const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken)

        if (payload) {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: payload.id,
                },
                select: {
                    id: true,
                }
            })

            if (!user) {
                throw new NotFoundException('Пользователь не найден')
            }

            return this.auth(res, payload.id)
        }
    }

    private auth(res: Response, userId: string) {
        const {refreshToken, accessToken} = this.generateTokens(userId)

        this.setCookies(res, refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))

        return {accessToken}
    }


    async validateUser(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            }
        })

        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }

        return user
    }
}
