import { PlayersListGenericRowOther } from './players-list-generic-row-other.mode';

export interface PlayersListGenericRow {
  playerId: string;
  playerName: string;
  playerNameShort: string;
  teamShort: string;
  popularity: number;
  price: number;
  position: string;
  totalPoints: number;
  otherValues: PlayersListGenericRowOther[];
}
