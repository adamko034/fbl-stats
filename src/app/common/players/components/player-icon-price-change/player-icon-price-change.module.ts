import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconScaleModule } from 'src/app/common/directives/mat-icon-scale/mat-icon-scale.module';
import { PlayerIconPriceChangeComponent } from './player-icon-price-change.component';

@NgModule({
  declarations: [PlayerIconPriceChangeComponent],
  imports: [CommonModule, MatIconModule, MatIconScaleModule],
  exports: [PlayerIconPriceChangeComponent]
})
export class PlayerIconPriceChangeModule {}
