import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MyTeamPlayersFilters } from './my-team-players-filters.model';
import { MyTeamTilesDisplaySettings } from './my-team-tiles-display-settings.model';

export interface MyTeamState {
  players: Player[];
  filters: MyTeamPlayersFilters;
  displaySettings: MyTeamTilesDisplaySettings;
  lastMatchday: number;
  lastKnownMatchday: number;
  kickOffTimesMatchdays: number;
  nextFixtures: MatchdayFixtures[];
}
