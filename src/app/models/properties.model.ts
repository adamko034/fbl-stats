export interface Properties {
  lastMatchday: number;
  playerMaxPrice: number;
  teams: TeamProperty[];
}

export interface TeamProperty {
  name: string;
  short: string;
}
