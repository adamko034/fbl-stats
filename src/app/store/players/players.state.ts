import { Player } from 'src/app/store/players/models/player.model';

export interface PlayersState {
  goalkeepers?: Player[];
  defenders?: Player[];
  midfielders?: Player[];
  forwards?: Player[];

  players: Player[];
}
