import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { OurPicksDisplay } from 'src/app/modules/fantasy/matchday-tips/matchday-tips-our-picks/models/our-picks-display.enum';
import { OurPicksView } from 'src/app/modules/fantasy/matchday-tips/matchday-tips-our-picks/models/our-picks-view.enum';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';

export interface GuiConfig {
  sidenavExpanded: boolean;
  players: GuiConfigPlayers;
  ourPicks?: GuiConfigOurPicks;
  myTeam?: GuiConfigMyTeam;
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
  display?: OurPicksDisplay;
  view?: OurPicksView;
  sortBy?: SortBy;
}
