import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { PlayerIconLineupPredictionComponent } from './player-icon-lineup-prediction.component';

@NgModule({
  declarations: [PlayerIconLineupPredictionComponent],
  imports: [CommonModule, MatIconModule, ScaleModule],
  exports: [PlayerIconLineupPredictionComponent]
})
export class PlayerIconLineupPredictionModule {}
