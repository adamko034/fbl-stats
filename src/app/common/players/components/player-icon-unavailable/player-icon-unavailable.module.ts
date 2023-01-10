import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconScaleModule } from 'src/app/common/directives/mat-icon-scale/mat-icon-scale.module';
import { PlayerIconUnavailableComponent } from './player-icon-unavailable.component';

@NgModule({
  declarations: [PlayerIconUnavailableComponent],
  imports: [CommonModule, MatIconModule, MatIconScaleModule],
  exports: [PlayerIconUnavailableComponent]
})
export class PlayerIconUnavailableModule {}
