export interface TeamPlayersTablePlayer {
  id?: string;
  name: string;
  available?: boolean;
  position: string;
  price: number;
  popularity: number;
  teamShort: string;
  other: { [field: string]: string };
}
