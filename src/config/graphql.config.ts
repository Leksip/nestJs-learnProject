import {GqlModuleOptions} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { join } from "path";
import {isDev} from "../utils/is-dev.utils";
import {ConfigService} from "@nestjs/config";

export async function getGraphQlConfig(configService: ConfigService): Promise<ApolloDriverConfig> {
    return {
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: isDev(configService),
        context: ({req, res}) => ({req, res})
    }
}