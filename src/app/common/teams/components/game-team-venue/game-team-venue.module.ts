import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { TeamLogoModule } from '../../team-logo/team-logo.module';
import { MatchdayFirstGameIconModule } from '../matchday-first-game-icon/matchday-first-game-icon.module';
import { GameTeamVenueComponent } from './game-team-venue.component';

@NgModule({
  declarations: [GameTeamVenueComponent],
  imports: [CommonModule, TeamLogoModule, PipesModule, MatchdayFirstGameIconModule, RouterModule],
  exports: [GameTeamVenueComponent]
})
export class GameTeamVenueModule {}
