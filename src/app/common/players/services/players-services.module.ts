import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerPredictionCombinedDeterminer } from './player-prediction-combined-determiner.service';
import { PlayerPredictionFilterDeterminer } from './player-prediction-filter-determiner.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [PlayerPredictionCombinedDeterminer, PlayerPredictionFilterDeterminer]
})
export class PlayersServicesModule {}
