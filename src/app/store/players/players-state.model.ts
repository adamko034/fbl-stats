import { Player } from 'src/app/models/player.model';

export interface PlayersState {
  goalkeepers?: Player[];
  defenders?: Player[];
  midfielders?: Player[];
  forwards?: Player[];

  players: Player[];
}
