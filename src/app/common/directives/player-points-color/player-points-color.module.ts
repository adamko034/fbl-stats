import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerPointsColorDirective } from './player-points-color.directive';

@NgModule({
  declarations: [PlayerPointsColorDirective],
  imports: [CommonModule],
  exports: [PlayerPointsColorDirective]
})
export class PlayerPointsColorModule {}
