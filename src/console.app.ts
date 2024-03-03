#!/usr/bin/env nodejs
import * as dotenv from 'dotenv';
dotenv.config({
    path: `${__dirname}/../.env`,
});
import {CommandFactory} from "nest-commander";
import {ConsoleModule} from "./apps/console.module";

(async () => {
    await CommandFactory.run(ConsoleModule, {
        logger: ['warn', 'error'],
        errorHandler: (error) => {
            console.error(error)
        }
    })
})()