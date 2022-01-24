import { CompareBestGks } from 'src/app/store/compare/models/compare-best-gks.model';
import { Player } from 'src/app/store/players/models/player.model';

export interface AdminBestGksState {
  goalkeepers: Player[];
  bestGks: CompareBestGks;
}
