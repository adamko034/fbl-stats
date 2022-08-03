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
  showTop100Popularity: boolean;
  showTop500Popularity: boolean;
  showGamesStarted: boolean;
  showFormGamesStarted: boolean;
  showGames70Minutes: boolean;
  showFormGames70Minutes: boolean;
  showAddOurPicks: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
