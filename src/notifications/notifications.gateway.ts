import {
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    private readonly logger = new Logger(NotificationsGateway.name);

    @WebSocketServer()
    private readonly server: Server;

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    notifyAboutUpdate(data: any) {
        this.server.emit('row-update', data);
    }
}
