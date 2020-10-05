export interface PlayersFilters {
  position?: PlayerPosition;
  price?: number;
  matchdays?: number;
  length?: number;
  popularity?: number;
  team?: string;
}

export enum PlayerPosition {
  GK = 'goalkeepers',
  DEF = 'defenders',
  MID = 'midfielders',
  FOR = 'forwards'
}
