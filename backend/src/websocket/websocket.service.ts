import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type MessageData = {
  message: string;
};

type JoinRoomData = {
  roomId: string;
  username: string;
};

type Room = {
  id: string;
  messages: {
    username: string;
    message: string;
  }[];
};

@WebSocketGateway(0, {
  cors: {
    origin: '*',
  },
  namespace: 'room',
})
export class WebsocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private users = {};
  private messages: Room[] = [];

  handleConnection(client: Socket, ...args: any[]) {
    // const { name } = client.handshake.query;
    // this.users[client.id] = { name };
  }

  handleDisconnect(client: Socket) {
    delete this.users[client.id];
  }

  @SubscribeMessage('join-room')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: JoinRoomData,
  ) {
    const { username, roomId } = body;
    this.users[client.id] = { username, roomId };
    client.join(roomId);
    const currentRoom = this.messages.find((room) => room.id === roomId);
    client.emit('receive-old-messages', {
      messages: currentRoom?.messages ?? [],
    });
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: MessageData,
  ) {
    const { username, roomId } = this.users[client.id];
    const currentRoomIndex = this.messages.findIndex(
      (room) => room.id === roomId,
    );
    if (currentRoomIndex === -1) {
      this.messages.push({ id: roomId, messages: [{ username, message: body.message}] });
    } else {
      this.messages[currentRoomIndex].messages.push({ username, message: body.message});
    }
    return client.broadcast
      .to(roomId)
      .emit('receive-message', { ...body, username });
  }
}
