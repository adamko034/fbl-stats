export interface Properties {
  lastMatchday: number;
  playerMaxPrice: number;
  teams: TeamProperty[];
  lineupSources: { [sourceName: string]: LineupsSourceProperty };
}

export interface TeamProperty {
  name: string;
  short: string;
}

export enum LineupsSource {
  BUNDESLIGA = 'bundesliga',
  KICKER = 'kicker'
}

export interface LineupsSourceProperty {
  teams: { [teamShort: string]: string };
  name: string;
}
