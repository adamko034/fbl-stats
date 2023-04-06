import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconScaleModule } from 'src/app/common/directives/mat-icon-scale/mat-icon-scale.module';
import { MatchdayFirstGameIconComponent } from './matchday-first-game-icon.component';

@NgModule({
  declarations: [MatchdayFirstGameIconComponent],
  imports: [CommonModule, MatIconModule, MatIconScaleModule, MatTooltipModule],
  exports: [MatchdayFirstGameIconComponent]
})
export class MatchdayFirstGameIconModule {}
