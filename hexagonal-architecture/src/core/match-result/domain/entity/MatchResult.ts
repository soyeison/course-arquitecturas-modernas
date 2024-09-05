import { Status } from '../../../../shared/domain/Status';
import { PlayerPoints } from '../../../player-points/domain/PlayerPoints';

export class MatchResult {
  public pointsPlayer1: PlayerPoints;
  public pointsPlayer2: PlayerPoints;
  public matchStatus: Status;

  constructor(
    player1: string,
    setsPlayer1: number,
    player2: string,
    setsPlayer2: number,
    matchStatus: Status,
  ) {
    this.pointsPlayer1 = new PlayerPoints(player1, setsPlayer1);
    this.pointsPlayer2 = new PlayerPoints(player2, setsPlayer2);
    this.matchStatus = matchStatus;
  }
}
