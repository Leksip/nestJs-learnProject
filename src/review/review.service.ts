import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ReviewEntity} from "./entities/review.entity";
import {ReviewDto} from "./dto/review.dto";
import {MovieService} from "../movie/movie.service";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
        private readonly movieService: MovieService,
    ) {
    }


    async createReview(dto: ReviewDto): Promise<ReviewEntity> {
       const {text, rating, movieId} = dto
        const movie = await this.movieService.findById(movieId)
        const review = this.reviewRepository.create({
            text,
            rating,
            movie
        });
        return await this.reviewRepository.save(review);
    }
}
