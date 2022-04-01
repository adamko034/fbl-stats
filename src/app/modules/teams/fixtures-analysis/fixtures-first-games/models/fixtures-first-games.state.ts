import { FixturesFirstGamesFilters } from './fixtures-first-games-fitlers.model';
import { FixturesFirstGamesMatchday } from './fixtures-first-games-matchday.model';
import { FixturesFirstGamesTeam } from './fixtures-first-games-team.model';

export interface FixturesFirstGamesState {
  teams: FixturesFirstGamesTeam[];
  matchdays: FixturesFirstGamesMatchday[];
  filters: FixturesFirstGamesFilters;
  nextMatchday: number;
}
