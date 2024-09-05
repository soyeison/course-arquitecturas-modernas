import { Injectable } from '@nestjs/common';
import { TennisMatch } from '../domain/entity/TennisMatch';
import { TennisMatchDTO } from '../domain/dto/TennisMatchDto';
import { Status } from '../../../shared/domain/Status';
import { MatchResult } from '../../match-result/domain/entity/MatchResult';
import { HumidityDTO } from '../domain/dto/HumidityDto';
import { DbPort } from '../../database/port/DbPort';

@Injectable()
export class TennisService {
  private activeMatches: Map<string, TennisMatch> = new Map();

  constructor(private readonly dbPort: DbPort) {}

  startMatch(player1: string, player2: string): TennisMatchDTO {
    const id = 'nuevo is 1';
    const match: TennisMatch = new TennisMatch(player1, player2);
    this.activeMatches.set(id, match);

    const matchDto = new TennisMatchDTO();
    matchDto.id = id;
    matchDto.player1 = player1;
    matchDto.player2 = player2;
    matchDto.status = Status.inProgress;

    this.dbPort.upsertMatch(matchDto);
    return matchDto;
  }

  getMatchDto(matchId: string, currentResult: MatchResult) {
    const matchDto = new TennisMatchDTO();
    matchDto.id = matchId;
    matchDto.player1 = currentResult.pointsPlayer1.player;
    matchDto.setPlayer1 = currentResult.pointsPlayer1.setsWon;
    matchDto.player2 = currentResult.pointsPlayer2.player;
    matchDto.setPlayer2 = currentResult.pointsPlayer2.setsWon;
    matchDto.status = currentResult.matchStatus;
    return matchDto;
  }

  addPoint(matchId: string, player: string) {
    const currentnResult: MatchResult = this.activeMatches
      .get(matchId)
      .point(player);
    const matchDto = this.getMatchDto(matchId, currentnResult);
    this.dbPort.upsertMatch(matchDto);

    if (currentnResult.matchStatus === Status.finished) {
      // Notificar con el puerto de notificacion
      this.activeMatches.delete(matchId);
    }

    return matchDto;
  }

  humidityChanged(humidity: HumidityDTO) {
    if (humidity.humidityPercentage > 10) {
      for (const match of this.activeMatches.keys()) {
        this.dbPort.updateStatus(match, Status.suspended);
      }
    }

    this.activeMatches.clear();
  }
}
