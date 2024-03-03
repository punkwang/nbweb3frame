import {Sequelize} from "sequelize-typescript";
import * as mysqlEntities from "./mysql";
import * as mongoEntities from "./mongo";
import {ModelCtor} from "sequelize-typescript/dist/model/model/model";
import {ObjectHelper} from "../helpers";
import {now} from "moment";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {Connection} from 'mongoose';
import {createNamespace} from 'cls-hooked';
import {SequelizeModule} from "@nestjs/sequelize";
import {env} from "../base";

Sequelize.useCLS(createNamespace('my-very-own-namespace'));

const mongoModels = [];
for (const key in mongoEntities) {
    const mongoModel = ObjectHelper.valueOf<any>(mongoEntities[key])[0];
    if (!mongoModel) break;
    mongoModels.push({
        name: mongoModel.name,
        schema: mongoModel.Schema
    });
}
export const MysqlModules = [
    SequelizeModule.forRoot({
        dialect: env('mysql.dialect'),
        host: env('mysql.host'),
        port: parseInt(env('mysql.port')),
        username: env('mysql.user'),
        password: env('mysql.pass'),
        database: env('mysql.name'),
        dialectOptions: {
            charset: env('mysql.charset'),
            decimalNumbers: true
        },
        logging: env('mysql.logging') === '1' ? console.log : false,
        autoLoadModels: true,
        synchronize: true,
        models: ObjectHelper.valueOf<ModelCtor>(mysqlEntities),
        hooks: {
            afterConnect(connection: unknown, config: any): any {
                global.sequelize = this;
            },
            beforeCreate(model, options): any {
                if (!model) return;
                if (model.get("created") as number >= 0) {
                    model.set("created", Math.floor(now() / 1000));
                }
                if (model.get("updated") as number >= 0) {
                    model.set("updated", Math.floor(now() / 1000));
                }
                return
            },
            beforeUpdate(model, options): any {
                if (model.get("updated") as number >= 0) {
                    model.set("updated", Math.floor(now() / 1000));
                }
            }
        }
    })
]

const MongodbModule = MongooseModule.forRoot(env('mongodb.dsn'), {})
const MongodbModels = MongooseModule.forFeature(mongoModels);

export {
    MongodbModule, MongodbModels
};