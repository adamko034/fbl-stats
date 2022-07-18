import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlayerIconSuspensionRiskComponent } from './player-icon-suspension-risk.component';

@NgModule({
  declarations: [PlayerIconSuspensionRiskComponent],
  imports: [CommonModule, MatTooltipModule, FlexLayoutModule],
  exports: [PlayerIconSuspensionRiskComponent]
})
export class PlayerIconSuspensionRiskModule {}
