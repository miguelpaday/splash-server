import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { BetsModule } from './bets/bets.module';

@Module({
  imports: [MessagesModule, BetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
