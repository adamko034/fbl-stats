import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';

export interface IPlayersStore {
  loadGoalkeepers: () => Observable<Player[]>;
  loadDefenders: () => Observable<Player[]>;
  loadMidfielders: () => Observable<Player[]>;
  loadForwards: () => Observable<Player[]>;
}
