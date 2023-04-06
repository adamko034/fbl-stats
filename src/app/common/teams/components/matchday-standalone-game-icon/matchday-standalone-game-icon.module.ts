import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconScaleModule } from 'src/app/common/directives/mat-icon-scale/mat-icon-scale.module';
import { MatchdayStandaloneGameIconComponent } from './matchday-standalone-game-icon.component';

@NgModule({
  declarations: [MatchdayStandaloneGameIconComponent],
  imports: [CommonModule, MatIconModule, MatIconScaleModule, MatTooltipModule],
  exports: [MatchdayStandaloneGameIconComponent]
})
export class MatchdayStandaloneGameIconModule {}
