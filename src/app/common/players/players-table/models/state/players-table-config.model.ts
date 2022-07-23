export interface PlayersTableConfig {
  showSeasonTitle: boolean;
  showMyTeamButtons: boolean;
  showTeamsFilter: boolean;
  showMaxPriceFilter: boolean;
  showMaxPopularityFilter: boolean;
  showPlayerSearchFilter: boolean;
  showHideUnavailableFilter: boolean;
  showPredictionFilter: boolean;
  showNextGame: boolean;
  showPrediction: boolean;
  showLeadersPopularity: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
