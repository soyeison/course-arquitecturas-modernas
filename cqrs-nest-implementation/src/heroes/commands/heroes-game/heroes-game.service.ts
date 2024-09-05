import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { KillDragonDto } from '../../interfaces/kill-dragon-dto/kill-dragon-dto.interface';

@Injectable()
export class HeroesGameService {
  constructor(private commandBus: CommandBus) {}

  async killDragon(heroId: string, killDragonDto: KillDragonDto) {
    return this.commandBus.execute(
      new KillDragonCommand(heroId, killDragonDto.dragonId),
    );
  }
}
