export interface Properties {
  lastMatchday: number;
  playerMaxPrice: number;
  budgetPlayerMaxPrice: number;
  lastKnownMatchday: number;
  lastUpdated: Date;
  lineupSources: { [sourceName: string]: LineupsSourceProperty };
  teamsNavigation: TeamNavigation[];
  unlimitedTransfers: UnlimitedTransfers;
  transfersDeadline: Date;
}

export interface UnlimitedTransfers {
  source: string;
  dates: UnlimitedTransfersDate[];
}

export interface UnlimitedTransfersDate {
  matchday: number;
  endDate: Date;
  startDate: Date;
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
