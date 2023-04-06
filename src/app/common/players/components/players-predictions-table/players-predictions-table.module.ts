import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PlayerIconLineupPredictionModule } from '../player-icon-lineup-prediction/player-icon-lineup-prediction.module';
import { PlayerNameLinkModule } from '../player-name-link/player-name-link.module';
import { PlayersPredicitonsTableComponent } from './players-predicitons-table.component';

@NgModule({
  declarations: [PlayersPredicitonsTableComponent],
  imports: [CommonModule, NgPipesModule, StickyModule, PlayerNameLinkModule, PlayerIconLineupPredictionModule],
  exports: [PlayersPredicitonsTableComponent]
})
export class PlayersPredictionsTableModule {}
