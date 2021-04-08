import { PlayerScoringChance } from './player-scoring-chance.model';

export interface PlayerScoringChances {
  overall: PlayerScoringChance;
  last5: PlayerScoringChance;
  home: PlayerScoringChance;
  away: PlayerScoringChance;
  vsTop6: PlayerScoringChance;
  vsWorst6: PlayerScoringChance;
}
