import * as services from './services'
import {ObjectHelper} from "./helpers";
import {Provider, Type} from "@nestjs/common";
import {MysqlModules, MongodbModule, MongodbModels} from "./entities";
import {env} from "./base";
import {CacheModule} from "@nestjs/common/cache";

const imports = [];

if (env('mysql.enable') == "1") {
    imports.push(...MysqlModules);
}

if (env('mongodb.enable') == "1") {
    imports.push(MongodbModule, MongodbModels);
}
if (env('redis.enable') == '1') {
    imports.push(CacheModule.register({
        isGlobal: true,
        ttl: 0,
        host: env('redis.host'),
        port: env('redis.port', 6379, parseInt),
        db: env('redis.cache_db'),
        password: env('redis.password', undefined),
    }));
}

export default {
    imports: [...imports],
    controllers: [],
    providers: [...ObjectHelper.valueOf<Type>(services)],
}