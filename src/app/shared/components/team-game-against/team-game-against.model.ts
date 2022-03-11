export interface TeamGameAgainst {
  shortName: string;
  md: number;
  rank: number;
  isHome: boolean;
  isFirstGame?: boolean;
  isStandalone?: boolean;
  isPostponed: boolean;
  result?: string;
  points?: number;
}
