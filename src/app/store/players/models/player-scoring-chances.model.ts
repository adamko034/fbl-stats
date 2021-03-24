import { PlayerScoringChance } from './player-scoring-chance.model';

export interface PlayerScoringChances {
  overall: PlayerScoringChance;
  last5: PlayerScoringChance;
}
