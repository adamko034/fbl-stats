import { PredictedLineupPlayer } from 'src/app/modules/lineups/store/models/predicted-lineup-player.model';

export interface SourcePredictedLineups {
  order: number;
  sourceName: string;
  sourceUrl: string;
  goalkeeper: PredictedLineupPlayer;
  defenders: PredictedLineupPlayer[];
  midfielders: PredictedLineupPlayer[];
  forwards: PredictedLineupPlayer[];
}
