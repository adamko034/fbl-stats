import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamLogoModule } from '../../team-logo/team-logo.module';
import { GameTeamVenueComponent } from './game-team-venue.component';

@NgModule({
  declarations: [GameTeamVenueComponent],
  imports: [CommonModule, TeamLogoModule, FlexLayoutModule],
  exports: [GameTeamVenueComponent]
})
export class GameTeamVenueModule {}
