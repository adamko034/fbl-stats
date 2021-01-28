import { PredictedLineupPlayer } from 'src/app/modules/lineups/store/models/predicted-lineup-player.model';

export interface SourcePredictedLineups {
  sourceName: string;
  sourceUrl: string;
  goalkeeper: PredictedLineupPlayer;
  defenders: PredictedLineupPlayer[];
  midfielders: PredictedLineupPlayer[];
  forwards: PredictedLineupPlayer[];
}
