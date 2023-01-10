import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconScaleModule } from 'src/app/common/directives/mat-icon-scale/mat-icon-scale.module';
import { PlayerIconReturningComponent } from './player-icon-returning.component';

@NgModule({
  declarations: [PlayerIconReturningComponent],
  imports: [CommonModule, MatIconScaleModule, MatIconModule, MatToolbarModule],
  exports: [PlayerIconReturningComponent]
})
export class PlayerIconReturningModule {}
