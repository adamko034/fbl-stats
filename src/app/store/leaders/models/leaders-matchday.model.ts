import { MinMaxAvg } from 'src/app/shared/models/minmaxavg-model';
import { LeadersFormation } from './leaders-formation.model';
import { LeadersPlayers } from './leaders-players.model';

export interface LeadersMatchday {
  matchday: number;
  managersCount: number;
  formations: LeadersFormation[];
  points: MinMaxAvg;
  teamValue: MinMaxAvg;
  players: LeadersPlayers;
}
