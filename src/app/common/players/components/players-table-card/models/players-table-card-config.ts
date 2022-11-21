export interface PlayersTableCardConfig {
  title: string;
  showMoreText?: string;
  showPositionSwitch: boolean;
  showPrice: boolean;
  showPopularity: boolean;
  showTop100Popularity: boolean;
  showTop500Popularity: boolean;
  showTotalPoints: boolean;
  showAvgPoints: boolean;
  customColumns: { order: number; header: string; fieldName: string; bold: boolean }[];
}
