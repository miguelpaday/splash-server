import { Bet } from '../entities/bet.entity';

export class CreateBetDto extends Bet {
  score?: number;
}
