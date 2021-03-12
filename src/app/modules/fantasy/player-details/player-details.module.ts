import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailsRoutingModule } from './player-details-routing.module';
import { PlayerDetailsContentComponent } from './view/player-details-content/player-details-content.component';
import { PlayerDetailsResolver } from './resolvers/player-details.resolver';
import { PlayerDetailsLoader } from './loaders/player-details.loader';
import { PlayerDetailsFantasyCreator } from './loaders/creators/player-details-fantasy.creator';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayerDetailsMainComponent } from './view/player-details-content/player-details-main/player-details-main.component';
import { PlayerDetailsMatchdaysComponent } from './view/player-details-content/player-details-matchdays/player-details-matchdays.component';
import { PlayerMatchdaysTimelineComponent } from './components/player-matchdays-timeline/player-matchdays-timeline.component';
import { PlayerDetailsTeamCreator } from './loaders/creators/player-details-team.creator';
import { PlayerDetailsGamesCreator } from './loaders/creators/player-details-games.creator';
import { PlayerDetailsFabric } from './loaders/player-details.fabric';

@NgModule({
  declarations: [
    PlayerDetailsContentComponent,
    PlayerDetailsMainComponent,
    PlayerDetailsMatchdaysComponent,
    PlayerMatchdaysTimelineComponent
  ],
  imports: [CommonModule, PlayerDetailsRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    PlayerDetailsResolver,
    PlayerDetailsLoader,
    PlayerDetailsTeamCreator,
    PlayerDetailsFantasyCreator,
    PlayerDetailsGamesCreator,
    PlayerDetailsFabric
  ]
})
export class PlayerDetailsModule {}
