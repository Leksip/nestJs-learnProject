import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ReviewEntity} from "../../review/entities/review.entity";
import {ActorEntity} from "../../actor/entities/actor.entity";
import {PosterEntity} from "../../poster/entities/poster.entity";

export enum Genre {
    ACTION = 'action',
    HORROR = 'horror',
    DRAMA = 'drama',
    COMEDY = 'comedy',
}

@Entity({name: 'movies'})
export class MovieEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 128,
    })
    title: string

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string

    @Column({
        name: "is_available",
        type: 'boolean',
        default: false
    })
    isAvailable: boolean

    @Column({
        name: "release_year",
        type: 'int',
        unsigned: true,
    })
    releaseYear: number

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1,
        default: 0,
    })
    rating: number

    @Column({
        name: 'poster_id',
        type: 'uuid',
        nullable: true,
    })
    posterId: string

    @OneToOne(() => PosterEntity, poster => poster.movie, {onDelete: "CASCADE", nullable: true})
    @JoinColumn({name: 'poster_id'})
    poster: PosterEntity | null;

    @OneToMany(() => ReviewEntity, (review) => review.movie)
    reviews: ReviewEntity[]

    @ManyToMany(() => ActorEntity, (actor) => actor.movies)
    @JoinTable({
        name: 'movie_actors',
        joinColumn: {name: 'movie_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'actor_id', referencedColumnName: 'id'},
    })
    actors: ActorEntity[]

    @Column({
        type: 'enum',
        enum: Genre,
        default: Genre.ACTION,
    })
    genre: Genre

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date
}