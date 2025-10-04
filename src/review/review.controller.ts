import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ReviewService} from './review.service';
import {ReviewDto} from "./dto/review.dto";
import {LowerCasePipe} from "../common/pipes/lower-case.pipe";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {
    }


    @Post()
    create(@Body() dto: ReviewDto) {
        return this.reviewService.createReview(dto)
    }
}
