import {Injectable} from '@nestjs/common';
import {ReviewDto} from "./dto/review.dto";
import {MovieService} from "../movie/movie.service";
import {PrismaService} from "../prisma/prisma.service";
import {Review} from 'generated/prisma';

@Injectable()
export class ReviewService {
    constructor(
        private prismaService: PrismaService,
        private movieService: MovieService,
    ) {
    }


    async createReview(dto: ReviewDto): Promise<Review> {
        const {text, rating, movieId} = dto
        const movie = await this.movieService.findById(movieId)
        const review = await this.prismaService.review.create({
            data: {
                text,
                rating,
                movie:{
                    connect:{
                        id: movie.id,
                    }
                },
            }
        });
        return review;
    }
}
