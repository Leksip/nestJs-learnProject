import {Query, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UserModel} from './models/user.model';
import {Authorization} from "../auth/decorators/authorization.decorator";
import {Authorized} from "../auth/decorators/authorized.decorator";
import {UserRole} from "generated/prisma";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {
    }

    @Authorization()
    @Query(() => UserModel,{
        name: 'getCurrentUser',
        description: 'Получить текущего пользователя'
    })
    getMe(@Authorized() user: UserModel) {
        return user
    }

    @Authorization(UserRole.ADMIN)
    @Query(() => [UserModel])
    async getUsers() {
        return await this.userService.findAll()
    }
}
