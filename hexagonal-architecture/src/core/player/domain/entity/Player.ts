export class Player {
  public setsWon: number = 0;
  public warnings: number = 0;

  constructor(
    public name: string,
    public maxWarnings: number,
  ) {}

  addSet() {
    return this.setsWon++;
  }

  warn() {
    this.warnings++;
    if (this.warnings === this.maxWarnings) {
      throw new Error('Error');
    }
  }

  getSetsWon(): number {
    return this.setsWon;
  }

  getName() {
    return this.name;
  }
}
