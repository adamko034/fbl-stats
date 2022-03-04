export interface TeamGameAgainst {
  shortName: string;
  md: number;
  rank: number;
  isHome: boolean;
  isFirstGame?: boolean;
  isStandalone?: boolean;
  result?: string;
  points?: number;
}
