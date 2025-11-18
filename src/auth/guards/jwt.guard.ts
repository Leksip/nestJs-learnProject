import {AuthGuard} from "@nestjs/passport";
import type {ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";

export class JwtGuard extends AuthGuard('jwt') {
    public getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}