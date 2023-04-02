import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { CreateBetDto } from 'src/bets/dto/create-bet.dto';
import { BetsService } from 'src/bets/bets.service';
import { Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(BetsService) private readonly betsService: BetsService,
  ) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  async joinRoom(@MessageBody() playerEntryDTO: CreateBetDto) {
    const players = await this.messagesService.joinRoom(playerEntryDTO);

    this.server.emit('otherJoin', players);
  }
}
