import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { PlayerIconMyTeamButtonsComponent } from './player-icon-my-team-buttons.component';

@NgModule({
  declarations: [PlayerIconMyTeamButtonsComponent],
  imports: [CommonModule, ScaleModule, MatTooltipModule, MatIconModule, MatButtonModule],
  exports: [PlayerIconMyTeamButtonsComponent]
})
export class PlayerIconMyTeamButtonsModule {}
