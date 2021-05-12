import { PredictedLineupsStatsPlayer } from './predicted-lineups-stats-player.model';

export interface PredictedLineupsStatsPlayers {
  topUnavailable: PredictedLineupsStatsPlayer[];
  topFormUnavailable: PredictedLineupsStatsPlayer[];
  topPopularityUnavailable: PredictedLineupsStatsPlayer[];
  top100PopularityUnavailable: PredictedLineupsStatsPlayer[];

  topBenched: PredictedLineupsStatsPlayer[];
  topFormBenched: PredictedLineupsStatsPlayer[];
  topPopularityBenched: PredictedLineupsStatsPlayer[];
  top100PopularityBenched: PredictedLineupsStatsPlayer[];

  topDoubts: PredictedLineupsStatsPlayer[];
  topFormDoubts: PredictedLineupsStatsPlayer[];
  topPopularityDoubts: PredictedLineupsStatsPlayer[];
  top100PopularityDoubts: PredictedLineupsStatsPlayer[];
}
