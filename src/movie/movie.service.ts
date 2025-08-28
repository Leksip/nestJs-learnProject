import {Injectable} from '@nestjs/common';

@Injectable()
export class MovieService {
     #movies = [
        {
            id: 1,
            title: 'test',
            genre: 'horror',
            description: 'test',
        },
        {
            id: 2,
            title: 'test2',
            genre: 'action',
            description: 'test2',
        }
    ];

    findAll(genre: string) {
        return this.#movies.filter(film => film.genre === genre);
    }
}
