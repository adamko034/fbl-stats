import { Position } from '../../models/position.enum';

export class PlayersTableUrlBuilder {
  private url: string;

  constructor() {
    this.url = '/fantasy/players/overall?';
  }

  public static init(): PlayersTableUrlBuilder {
    return new PlayersTableUrlBuilder();
  }

  public withSortBy(sortByField: string, order: 'asc' | 'desc'): PlayersTableUrlBuilder {
    this.url = `${this.url}&sortBy=${sortByField}&sortOrder=${order}`;
    return this;
  }

  public withPosition(position: Position): PlayersTableUrlBuilder {
    this.url = `${this.url}&position=${position}`;
    return this;
  }

  public build(): string {
    return this.url;
  }
}
