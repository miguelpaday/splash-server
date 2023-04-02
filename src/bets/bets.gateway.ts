import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BetsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly betsService: BetsService) {}

  @SubscribeMessage('betStart')
  async place(@MessageBody() createBetDto: CreateBetDto) {
    const multiplier = await this.betsService.place(createBetDto);
    this.server.emit('multiplier', multiplier);
  }

  @SubscribeMessage('findAllBets')
  findAll() {
    return this.betsService.findAll();
  }

  @SubscribeMessage('getResults')
  async results() {
    const results = await this.betsService.resultList();
    return results;
  }
}
