import { Injectable } from '@nestjs/common';
import { CreateBetDto } from 'src/bets/dto/create-bet.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { IPlayer } from './entities/player.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [
    {
      id: 0,
      name: 'Miguel',
      message: 'Helloaa World',
      date_sent: new Date(),
    },
  ];

  players: IPlayer[] = [];

  create(createMessageDto: CreateMessageDto) {
    const message = {
      id: 0,
      name: createMessageDto.name,
      message: createMessageDto.message,
      date_sent: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  joinRoom(player: CreateBetDto) {
    this.players = [];
    this.players.push({
      id: player.id,
      name: player.name,
      points: player.points,
      multiplier: 0,
    });

    for (let i = 1; i < 5; i++) {
      this.players.push({
        id: i,
        name: `CPU ${i}`,
        points: 0,
        multiplier: 0,
      });
    }
    console.log('JOINED');
    return this.players;
  }

  betStart() {}
}
