import { Module } from '@nestjs/common';
import { HeroesGameService } from './commands/heroes-game/heroes-game.service';

@Module({
  providers: [HeroesGameService]
})
export class HeroesModule {}
