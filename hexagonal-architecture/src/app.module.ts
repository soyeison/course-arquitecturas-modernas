import { Module } from '@nestjs/common';
import { PlayerModule } from './core/player/player.module';
import { TennisMatchModule } from './core/tennis-match/tennis-match.module';
import { TennisSetModule } from './core/tennis-set/tennis-set.module';
import { MatchResultModule } from './core/match-result/match-result.module';
import { PlayerPointsModule } from './core/player-points/player-points.module';
import { DatabaseModule } from './core/database/database.module';
import { WebModule } from './core/web/web.module';

@Module({
  imports: [
    PlayerModule,
    TennisMatchModule,
    TennisSetModule,
    MatchResultModule,
    PlayerPointsModule,
    DatabaseModule,
    WebModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
