export interface PlayersStatsPointsFilters {
  type: 'bundesliga' | 'main' | 'defence' | 'goalkeeping' | 'attacking';
  calculations: 'overall' | 'last5';
}
