import {Module, Type} from '@nestjs/common';
import common from './common/module'
import {ObjectHelper} from "./common/helpers";
import {Gateway} from "./websocket/gateway";
import * as events from './websocket/events';

@Module({
    imports: [...common.imports],
    providers: [...common.providers, ...ObjectHelper.valueOf<Type>(events),Gateway],
})
export class WebsocketModule {
}
