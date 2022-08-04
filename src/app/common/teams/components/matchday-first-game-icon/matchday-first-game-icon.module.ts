import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatchdayFirstGameIconComponent } from './matchday-first-game-icon.component';

@NgModule({
  declarations: [MatchdayFirstGameIconComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [MatchdayFirstGameIconComponent]
})
export class MatchdayFirstGameIconModule {}
