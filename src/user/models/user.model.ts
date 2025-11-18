import {Field, ObjectType, registerEnumType} from "@nestjs/graphql";
import {$Enums, User} from "generated/prisma";
import {BaseModel} from "../../common/models/base.model";
import UserRole = $Enums.UserRole;

registerEnumType(UserRole, {name: 'UserRole'})

@ObjectType({
    description: 'Модель пользователя'
})
export class UserModel extends BaseModel implements User {

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => UserRole,{
        description: 'Роль пользователя'
    })
    role: UserRole;

    @Field(() => String,{
        nullable: true,
        defaultValue: 'Nick',
        description: 'Имя пользователя'
    })
    name: string;
}