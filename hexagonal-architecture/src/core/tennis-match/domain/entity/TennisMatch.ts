import { Status } from '../../../../shared/domain/Status';
import { MatchResult } from '../../../match-result/domain/entity/MatchResult';
import { Player } from '../../../player/domain/entity/Player';
import { TennisSet } from '../../../tennis-set/domain/entity/TennisSet';

export class TennisMatch {
  public static NUMBER_OF_SETS = 5;
  public static MAX_WARNINGS = 3;

  public players: Map<string, Player>;
  public player1: string;
  public player2: string;
  public status: Status;
  public sets: TennisSet[];
  public currentSet: TennisSet;
  public winner: Player;

  constructor(player1: string, player2: string) {
    this.players = new Map<string, Player>();
    this.players.set(player1, new Player(player1, TennisMatch.MAX_WARNINGS));
    this.players.set(player2, new Player(player2, TennisMatch.MAX_WARNINGS));
    this.status = Status.notStarted;
    this.sets = [];
  }

  start() {
    if (this.status === Status.notStarted) {
      this.status = Status.inProgress;
    }
  }

  finish(winnerPlayer: string) {
    if (this.status === Status.inProgress) {
      this.status = Status.finished;
    }

    const winner = this.players.get(winnerPlayer);
    return winner;
  }

  point(player: string) {
    if (this.currentSet.addPoint(player)) {
      if (this.players.get(player).addSet() === TennisMatch.NUMBER_OF_SETS) {
        this.finish(player);
      } else {
        this.advanceSet();
      }
    }

    return this.matchResult();
  }

  advanceSet() {
    this.currentSet = new TennisSet(this.player1, this.player2);
    this.sets.push(this.currentSet);
  }

  warn(player: string) {
    try {
      this.players.get(player).warn();
    } catch (error) {
      const winnerName = player === this.player1 ? this.player1 : this.player2;
      this.finish(winnerName);
    }
  }

  getWinner() {
    if (this.status === Status.finished && this.winner !== null) {
      return this.winner;
    }

    throw new Error('Aun no hay winner');
  }

  matchResult() {
    const setsPlayer1 = this.players.get(this.player1).getSetsWon();
    const setsPlayer2 = this.players.get(this.player1).getSetsWon();

    return new MatchResult(
      this.player1,
      setsPlayer1,
      this.player2,
      setsPlayer2,
      this.status,
    );
  }
}
