import {Inject, Injectable} from "@nestjs/common";
import {Server, Socket} from "socket.io";
import {WebSocketServer} from "@nestjs/websockets";
import {TestService} from "../../common/services";

@Injectable()
export class MainEvent {
    constructor(
        protected testService: TestService
    ) {
    }

    async handle(client: Socket, data: any) {
        return {
            ...data,
            service_ret: this.testService.test()
        };
    }
}