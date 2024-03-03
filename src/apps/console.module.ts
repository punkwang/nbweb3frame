import {Module, Type} from '@nestjs/common';
import common from './common/module'
import * as commands from './console/commands'
import {ObjectHelper} from "./common/helpers";

@Module({
    imports: [...common.imports],
    controllers: [...common.controllers],
    providers: [...common.providers, ...ObjectHelper.valueOf<Type>(commands)],
})
export class ConsoleModule {
}
