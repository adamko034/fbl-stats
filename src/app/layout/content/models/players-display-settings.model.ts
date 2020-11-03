import { PlayersView } from 'src/app/layout/content/models/players-view.enum';

export interface PlayersDisplaySettings {
  view: PlayersView;
  count: number;
}
