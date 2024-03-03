import * as dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../.env`,
});
import {NestFactory} from '@nestjs/core';
import {ApiModule} from './apps/api.module';
import {clusterMaxThreadCount, clusterRunner, mainRunner} from "./apps/common/base/cluster";
import {env} from "./apps/common/base";
import {trim} from "lodash";
import {JsonExceptionFilter, JsonResponseInterceptor} from "./apps/common/filters";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    await app.listen(env('api.port', 3000, parseInt), env('api.host', 'localhost', trim));
    app.useGlobalInterceptors(new JsonResponseInterceptor())
    app.useGlobalFilters(new JsonExceptionFilter())
    app.useGlobalPipes(new ValidationPipe({
        stopAtFirstError: true
    }))
}

mainRunner(
    env('api.cluster.enable', 0, parseInt),
    env('api.cluster.count', 0, parseInt),
    bootstrap
).catch(console.log)


