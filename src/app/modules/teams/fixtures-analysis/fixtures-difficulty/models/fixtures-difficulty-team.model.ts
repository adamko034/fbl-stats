import { FixturesDifficultyTeamGame } from './fixtures-difficulty-team-game.model';

export interface FixturesDifficultyTeam {
  teamShort: string;
  index: number;
  rank: number;
  fixtures: FixturesDifficultyTeamGame[];
  value: number;
  color: string;
}
