export class PlayerPoints {
  public player: string;
  public setsWon: number;

  constructor(player: string, setsWon: number) {
    this.player = player;
    this.setsWon = setsWon;
  }
}
