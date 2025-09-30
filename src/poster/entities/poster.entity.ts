import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {MovieEntity} from "../../movie/entities/movie.entity";


@Entity({name: 'posters'})
export class PosterEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    imageUrl: string

    @OneToOne(() => MovieEntity, movie => movie.poster)
    movie: MovieEntity

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date
}