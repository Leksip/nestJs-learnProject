import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {MovieDto} from "./dto/movie.dto";
import {Actor, Movie} from 'generated/prisma';

@Injectable()
export class MovieService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async findAll(): Promise<any> {
        return this.prismaService.movie.findMany({
            // where: {
            //     isAvailable: true,
            // },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                actors: true,
                poster: true
            }
        });
    }

    //
    // async findAll(): Promise<MovieEntity[]> {
    //     return await this.movieRepository.find({
    //         where: {
    //             // releaseYear: 2001,
    //         },
    //         // take: 1,
    //         select: ['id', 'title', 'releaseYear'],
    //         relations: ['reviews', 'actors'],
    //         order: {
    //             createdAt: 'desc'
    //         }
    //     });
    // }

    async findById(id: string, ignoreIsAvailable = true): Promise<Movie> {
        const movie = await this.prismaService.movie.findUnique({
            where: {
                id: id
            },
            include: {
                actors: true,
                poster: true
            }
        })

        if (!movie || (!ignoreIsAvailable && !movie.isAvailable)) {
            throw new NotFoundException('Movie not found');
        }

        return movie;
    }

    private async findActors(actorIds: string[]): Promise<Actor[]> {
        const actors = await this.prismaService.actor.findMany({
            where: {
                id: {in: actorIds},
            }
        })

        if (!actors.length) throw new NotFoundException('Actor not found');
        return actors;
    }

    //
    // // private async getPoster(imageUrl?: string): Promise<PosterEntity | null> {
    // //     if (imageUrl && imageUrl.trim() !== '') {
    // //         const poster = this.posterRepository.create({imageUrl: imageUrl.trim()});
    // //         return await this.posterRepository.save(poster);
    // //     }
    // //     return null;
    // // }
    //
    //
    async create(dto: MovieDto): Promise<Movie> {
        const {title, actorIds, releaseYear, genre, imageUrl} = dto
        const actors = await this.findActors(actorIds)

        const movie = this.prismaService.movie.create({
            data: {
                title,
                releaseYear,
                genre,
                actors: {
                    connect: actors.map((actor) => ({
                        id: actor.id
                    }))
                },
                poster: imageUrl ? {
                    create: {
                        url: imageUrl
                    }
                } : undefined
            }
        });
        return movie;
    }


    async update(id: string, dto: MovieDto): Promise<Boolean> {
        const movie = await this.findById(id)
        const actors = await this.findActors(dto.actorIds)
        await this.prismaService.movie.update({
            where: {
                id: movie.id
            },
            data: {
                title: dto.title,
                releaseYear: dto.releaseYear,
                actors: {
                    connect: actors.map((actor) => ({
                        id: actor.id
                    }))
                },
                poster: dto.imageUrl ? {
                    create: {
                        url: dto.imageUrl
                    }
                } : undefined
            }
        })
        return true;
    }


    async delete(id: string): Promise<boolean> {
        const movie = await this.findById(id);
        await this.prismaService.movie.delete({
            where:{
                id: movie.id
            }
        });

        return true
    }
}
