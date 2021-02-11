import { MinMaxAvg } from 'src/app/shared/models/minmaxavg-model';
import { LeadersFormation } from './leaders-formation.model';
import { LeadersPlayersCombinations } from './leaders-players-combinations.model';
import { LeadersPlayers } from './leaders-players.model';

export interface LeadersMatchday {
  matchday: number;
  formations: LeadersFormation[];
  points: MinMaxAvg;
  teamValue: MinMaxAvg;
  playersCombinations: LeadersPlayersCombinations;
  playrs: LeadersPlayers;
}
