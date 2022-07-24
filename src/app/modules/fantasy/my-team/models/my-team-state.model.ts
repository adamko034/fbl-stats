import { PlayersTableState } from 'src/app/common/players/players-table/models/players-table-state';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Player } from 'src/app/store/players/models/player.model';
import { MyTeamTilesDisplaySettings } from './my-team-tiles-display-settings.model';

export interface MyTeamState {
  players: Player[];
  playersTableState: PlayersTableState;
  displaySettings: MyTeamTilesDisplaySettings;
  lastMatchday: number;
  lastKnownMatchday: number;
  kickOffTimesMatchdays: number;
  nextFixtures: MatchdayFixtures[];
}
