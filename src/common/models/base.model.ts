import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType({
    description: "Базовая модель",
    isAbstract: true
})
export class BaseModel {
    @Field(() => ID)
    id: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

