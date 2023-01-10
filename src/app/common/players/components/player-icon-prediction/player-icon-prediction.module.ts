import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { PlayerIconPredictionComponent } from './player-icon-prediction.component';

@NgModule({
  declarations: [PlayerIconPredictionComponent],
  imports: [CommonModule, MatIconModule, ScaleModule, MatTooltipModule],
  exports: [PlayerIconPredictionComponent]
})
export class PlayerIconPredictionModule {}
