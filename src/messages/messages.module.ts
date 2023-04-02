import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { BetsService } from 'src/bets/bets.service';
import { BetsModule } from 'src/bets/bets.module';

@Module({
  imports: [BetsModule],
  providers: [MessagesGateway, MessagesService, BetsService],
})
export class MessagesModule {}
