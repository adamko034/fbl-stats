import { Player } from 'src/app/store/players/models/player.model';

export abstract class PlayersFilter {
  abstract filter(players: Player[]): Player[];
}
