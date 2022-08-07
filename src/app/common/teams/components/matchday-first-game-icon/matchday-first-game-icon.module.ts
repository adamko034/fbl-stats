import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatIconScaleModule } from 'src/app/common/directives/mat-icon-scale/mat-icon-scale.module';
import { MatchdayFirstGameIconComponent } from './matchday-first-game-icon.component';

@NgModule({
  declarations: [MatchdayFirstGameIconComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatIconScaleModule],
  exports: [MatchdayFirstGameIconComponent]
})
export class MatchdayFirstGameIconModule {}
