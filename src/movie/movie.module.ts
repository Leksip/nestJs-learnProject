import {Module} from '@nestjs/common';
import {MovieService} from './movie.service';
import {MovieController} from './movie.controller';

@Module({
    imports: [],
    controllers: [MovieController],
    providers: [MovieService],
})
export class MovieModule {
}
