import { Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  players: Bet[] = [];
  selectedMultiplier: number = 0;
  max = 9;

  place(createBetDto: CreateBetDto) {
    this.selectedMultiplier = this.max * Math.random() + 1;

    this.players = [];

    this.players.push({
      id: createBetDto.id,
      name: createBetDto.name,
      points: createBetDto.points,
      multiplier: createBetDto.multiplier,
    });

    for (let i = 1; i < 5; i++) {
      this.players.push({
        id: i,
        name: `CPU ${i}`,
        points: 100,
        multiplier: Math.random() * 10,
      });
    }

    return this.selectedMultiplier;
  }

  resultList() {
    this.players.forEach((player: Bet) => {
      const total = Math.floor(player.points * player.multiplier);
      player.points = player.multiplier < this.selectedMultiplier ? total : 0;
    });
    console.log(this.players);
    return this.players;
  }

  findAll() {
    return `This action returns all bets`;
  }
}
