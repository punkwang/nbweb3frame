import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import {env, GatewayEvent} from "../common/base";
import {MainEvent} from "./events";

@WebSocketGateway(env('websocket.port', 4000, parseInt), {
    cors: {
        origin: '*'
    },
})
export class Gateway {


    // @SubscribeMessage('main')
    @GatewayEvent(MainEvent)
    async main(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    }
}