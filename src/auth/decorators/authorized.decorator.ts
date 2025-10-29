import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "generated/prisma";

export const Authorized = createParamDecorator(
    (data: keyof User, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()

        const user = request.user as User

        return data ? user[data] : user
    })