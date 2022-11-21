import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { PlayerIconPredictionComponent } from './player-icon-prediction.component';

@NgModule({
  declarations: [PlayerIconPredictionComponent],
  imports: [CommonModule, MatIconModule, ScaleModule, MatTooltipModule, FlexLayoutModule],
  exports: [PlayerIconPredictionComponent]
})
export class PlayerIconPredictionModule {}
