export interface Properties {
  lastMatchday: number;
  playerMaxPrice: number;
  budgetPlayerMaxPrice: number;
  lastUpdated: Date;
  lineupSources: { [sourceName: string]: LineupsSourceProperty };
}

export enum LineupsSource {
  BUNDESLIGA = 'bundesliga',
  KICKER = 'kicker',
  LIGAINSIDER = 'ligainsider'
}

export interface LineupsSourceProperty {
  teams: { [teamShort: string]: string };
  name: string;
}
