import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { MatchdayTipsOurPicksDisplay } from 'src/app/modules/fantasy/matchday-tips/matchday-tips-our-picks/models/matchday-tips-our-picks-display.enum';
import { MatchdayTipsOurPicksView } from 'src/app/modules/fantasy/matchday-tips/matchday-tips-our-picks/models/matchday-tips-our-picks-view.enum';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';

export interface GuiConfig {
  sidenavExpanded: boolean;
  players: GuiConfigPlayers;
  ourPicks?: GuiConfigOurPicks;
  myTeam?: GuiConfigMyTeam;
  comparePlayers?: GuiConfigComparePlayers;
}

export interface GuiConfigComparePlayers {
  includeMatchdays?: number;
  ids?: string[];
}

export interface GuiConfigMyTeam {
  playerIds?: string[];
  display?: GuiConfigMyTeamDisplay;
}

export interface GuiConfigMyTeamDisplay {
  tileOrder?: string;
}

export interface GuiConfigPlayers {
  view?: PlayersView;
  matchdays?: number;
}

export interface GuiConfigOurPicks {
  display?: MatchdayTipsOurPicksDisplay;
  view?: MatchdayTipsOurPicksView;
  sortBy?: SortBy;
}
