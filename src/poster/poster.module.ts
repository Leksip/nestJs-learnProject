import {Module} from '@nestjs/common';
import {PosterService} from './poster.service';
import {PosterController} from './poster.controller';

@Module({
    imports: [],
    controllers: [PosterController],
    providers: [PosterService],
})
export class PosterModule {
}
