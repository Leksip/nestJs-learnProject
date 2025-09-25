import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {In, Repository} from "typeorm";
import {MovieDto} from "./dto/movie.dto";
import {ActorEntity} from "../actor/entities/actor.entity";
import {ActorDto} from "../actor/dto/actor.dto";
import {PosterEntity} from "../poster/entities/poster.entity";

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>,
        @InjectRepository(ActorEntity) private readonly actorRepository: Repository<ActorEntity>,
        @InjectRepository(PosterEntity) private readonly posterRepository: Repository<PosterEntity>,
    ) {
    }

    async findAll(): Promise<MovieEntity[]> {
        return await this.movieRepository.find({
            where: {
                // releaseYear: 2001,
            },
            // take: 1,
            select: ['id', 'title', 'releaseYear'],
            relations: ['reviews', 'actors'],
            order: {
                createdAt: 'desc'
            }
        });
    }

    async findById(id: string): Promise<MovieEntity> {
        const movie = await this.movieRepository.findOne({
            where: {
                id: id
            }
        })

        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        return movie;
    }

    private async findActors(actorIds: string[]): Promise<ActorDto[]> {
        const actors = await this.actorRepository.find({
            where: {
                id: In(actorIds)
            }
        })

        if (!actors.length) throw new NotFoundException('Actor not found');
        return actors;
    }

    // private async getPoster(imageUrl?: string): Promise<PosterEntity | null> {
    //     if (imageUrl && imageUrl.trim() !== '') {
    //         const poster = this.posterRepository.create({imageUrl: imageUrl.trim()});
    //         return await this.posterRepository.save(poster);
    //     }
    //     return null;
    // }


    async create(dto: MovieDto): Promise<MovieEntity> {
        const {title, actorIds, releaseYear, genre, imageUrl} = dto
        const actors = await this.findActors(actorIds)
        let poster: PosterEntity | null = null
        if (imageUrl) {
           poster = this.posterRepository.create({imageUrl: imageUrl});
           await this.posterRepository.save(poster);
        }
        console.log(poster)
        const movie = this.movieRepository.create({
            title,
            actors,
            releaseYear,
            genre,
            poster,
        });
        return await this.movieRepository.save(movie);
    }

    async update(id: string, dto: MovieDto): Promise<Boolean> {
        const movie = await this.findById(id)

        Object.assign(movie, dto);

        await this.movieRepository.save(movie)

        return true;
    }


    async delete(id: string): Promise<string> {
        const movie = await this.findById(id);
        await this.movieRepository.delete(id);

        return movie.id
    }
}
