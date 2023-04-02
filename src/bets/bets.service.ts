import { Injectable } from '@nestjs/common';
import { IPlayer } from 'src/messages/entities/player.entity';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { Bet, Ranking } from './entities/bet.entity';

@Injectable()
export class BetsService {
  players: Bet[] = [];
  ranking: Ranking[] = [];
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

    const players = this.players;
    const multiplier = this.selectedMultiplier;

    return { players, multiplier };
  }

  resultList() {
    this.players.forEach((player: Bet) => {
      const total =
        player.multiplier < this.selectedMultiplier
          ? Math.floor(player.points * player.multiplier)
          : 0;
      const rankingIndex = this.ranking.findIndex(
        (rank) => rank.id === player.id,
      );
      if (rankingIndex >= 0) {
        this.ranking[rankingIndex].score += total;
      }
      this.ranking.sort((a, b) => b.score - a.score);

      player.points = total;
    });

    return this.players;
  }

  findAll() {
    return `This action returns all bets`;
  }

  getRanking() {
    console.log('ranking', this.ranking);
    return this.ranking;
  }

  initialize(playerEntryDTO: CreateBetDto) {
    this.ranking = [];
    this.ranking.push({
      id: playerEntryDTO.id,
      name: playerEntryDTO.name,
      score: playerEntryDTO.score,
    });

    for (let i = 1; i < 5; i++) {
      this.ranking.push({
        id: i,
        name: `CPU ${i}`,
        score: 1000,
      });
    }
    console.log('AFTER', this.ranking);
  }
}
