import { Fixture } from 'src/app/store/teams/models/fixture.model';

export interface Team {
  games: Fixture[];
  shortName: string;
  name: string;
  gamesPlayed: number;
  rank: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  form: string;
  last2Games: number;
  last3Games: number;
  last4Games: number;
  last5Games: number;
  goalsScored: number;
  goalsConceded: number;
  gspg: number;
  gcpg: number;
}
