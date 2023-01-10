export interface GuiConfig {
  players?: GuiConfigPlayers;
  myTeam?: GuiConfigMyTeam;
  comparePlayers?: GuiConfigComparePlayers;
}

export interface GuiConfigComparePlayers {
  ids?: string[];
}

export interface GuiConfigMyTeam {
  playerIds?: string[];
  display?: GuiConfigMyTeamDisplay;
  kickOffTimesMatchdays?: number;
}

export interface GuiConfigMyTeamDisplay {
  tileOrder?: string;
}

export interface GuiConfigPlayers {
  matchdays?: number;
}
