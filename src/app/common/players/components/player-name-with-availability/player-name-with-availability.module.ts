import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayerIconReturningModule } from '../player-icon-returning/player-icon-returning.module';
import { PlayerIconSuspensionRiskModule } from '../player-icon-suspension-risk/player-icon-suspension-risk.module';
import { PlayerIconUnavailableModule } from '../player-icon-unavailable/player-icon-unavailable.module';
import { PlayerNameLinkModule } from '../player-name-link/player-name-link.module';
import { PlayerNameWithAvailabilityComponent } from './player-name-with-availability.component';

@NgModule({
  declarations: [PlayerNameWithAvailabilityComponent],
  imports: [
    CommonModule,
    PlayerNameLinkModule,
    PlayerIconReturningModule,
    PlayerIconSuspensionRiskModule,
    PlayerIconUnavailableModule,
    FlexLayoutModule
  ],
  exports: [PlayerNameWithAvailabilityComponent]
})
export class PlayerNameWithAvailabilityModule {}
