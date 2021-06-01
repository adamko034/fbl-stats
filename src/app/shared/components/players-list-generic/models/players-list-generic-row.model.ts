import { PlayersListGenericRowOther } from './players-list-generic-row-other.mode';

export interface PlayersListGenericRow {
  playerId: string;
  playerName: string;
  teamShort: string;
  otherValues: PlayersListGenericRowOther[];
}
