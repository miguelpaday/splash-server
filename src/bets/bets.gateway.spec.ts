import { Test, TestingModule } from '@nestjs/testing';
import { BetsGateway } from './bets.gateway';
import { BetsService } from './bets.service';

describe('BetsGateway', () => {
  let gateway: BetsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetsGateway, BetsService],
    }).compile();

    gateway = module.get<BetsGateway>(BetsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
