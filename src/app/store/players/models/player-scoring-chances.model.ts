import { PlayerScoringChance } from './player-scoring-chance.model';

export interface PlayerScoringChances {
  overall: PlayerScoringChance;
  last4: PlayerScoringChance;
  last5: PlayerScoringChance;
  last6: PlayerScoringChance;
  home: PlayerScoringChance;
  away: PlayerScoringChance;
  vsTop6: PlayerScoringChance;
  vsWorst6: PlayerScoringChance;
}
