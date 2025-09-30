import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ActorDto} from "./dto/actor.dto";
import {Actor} from 'generated/prisma';

@Injectable()
export class ActorService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async create(dto: ActorDto): Promise<Actor> {
        const {name} = dto;
        const actor = await this.prismaService.actor.create({
            data: {name: name},
        })
        return actor;
    }
}
