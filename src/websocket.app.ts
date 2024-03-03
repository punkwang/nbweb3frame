import * as dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../.env`,
});
import {NestFactory} from '@nestjs/core';
import {WebsocketModule} from "./apps/websocket.module";
import {clusterMaxThreadCount, clusterRunner, mainRunner} from "./apps/common/base/cluster";
import {env} from "./apps/common/base";

async function bootstrap() {
    const app = await NestFactory.create(WebsocketModule);
    await app.listen(null)
}

mainRunner(
    env('websocket.cluster.enable', 0, parseInt),
    env('websocket.cluster.count', 0, parseInt),
    bootstrap
).catch(console.log)

