export class TennisSet {
  public static SET_POINTS: number = 6;
  public points: Map<string, number>;

  constructor(player1: string, player2: string) {
    this.points = new Map<string, number>();
    this.points.set(player1, 0);
    this.points.set(player2, 0);
  }

  addPoint(player: string) {
    let playerPoints = this.points.get(player);
    playerPoints++;
    if (playerPoints === TennisSet.SET_POINTS) return true;
    this.points.set(player, playerPoints);
    return false;
  }
}
