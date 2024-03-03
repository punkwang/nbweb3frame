import {Module, Type} from '@nestjs/common';
import * as controllers from './api/controllers';
import * as actions from './api/actions';
import {ObjectHelper} from "./common/helpers";
import {RouterModule} from "@nestjs/core";
import common from './common/module'

@Module({
    imports: [...common.imports, RouterModule.register([{
        path: 'api',
        module: ApiModule
    }])],
    controllers: [...common.controllers, ...ObjectHelper.valueOf<Type>(controllers)],
    providers: [...common.providers, ...ObjectHelper.valueOf<Type>(actions)],
})
export class ApiModule {
}
