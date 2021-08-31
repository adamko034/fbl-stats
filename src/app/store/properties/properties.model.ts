export interface Properties {
  lastMatchday: number;
  playerMaxPrice: number;
  budgetPlayerMaxPrice: number;
  lastUpdated: Date;
  lineupSources: { [sourceName: string]: LineupsSourceProperty };
  teamsNavigation: TeamNavigation[];
}

export interface TeamNavigation {
  teamShort: string;
  order: number;
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
