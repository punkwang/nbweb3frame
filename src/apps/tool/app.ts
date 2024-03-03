#!/usr/bin/env node
import * as dotenv from 'dotenv';
dotenv.config({
    path: `${__dirname}/../../../.env`,
});
import {CommandFactory} from "nest-commander";
import {Module, Type} from "@nestjs/common";

import {ObjectHelper} from "../common/helpers";
import common from '../common/module'
import * as commands from './commands'
import * as services from './services'

@Module({
    imports: [...common.imports],
    providers: [...common.providers, ...ObjectHelper.valueOf<Type>(services), ...ObjectHelper.valueOf<Type>(commands)]
})
class ToolCommandModule {

}

(async () => {
    await CommandFactory.run(ToolCommandModule, {
        logger: ['warn', 'error'],
        errorHandler: (error) => {
            console.error(error)
        }
    })
})()