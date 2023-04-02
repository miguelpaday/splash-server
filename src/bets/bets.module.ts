import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsGateway } from './bets.gateway';

@Module({
  providers: [BetsGateway, BetsService]
})
export class BetsModule {}
