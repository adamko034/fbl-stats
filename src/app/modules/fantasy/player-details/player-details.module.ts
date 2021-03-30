import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PositionsStatsLoadedGuard } from './guards/positions-stats-loaded.guard';
import { PlayerDetailsFantasyCreator } from './loaders/creators/player-details-fantasy.creator';
import { PlayerDetailsGamesCreator } from './loaders/creators/player-details-games.creator';
import { PlayerDetailsNextGameCreator } from './loaders/creators/player-details-next-game.creator';
import { PlayerDetailsTeamCreator } from './loaders/creators/player-details-team.creator';
import { PlayerDetailsFabric } from './loaders/player-details.fabric';
import { PlayerDetailsLoader } from './loaders/player-details.loader';
import { PlayerDetailsRoutingModule } from './player-details-routing.module';
import { PlayerDetailsResolver } from './resolvers/player-details.resolver';
import { PositionsStatsResolver } from './resolvers/positions-stats.resolver';
import { PlayerDetailsChartsComponent } from './view/player-details-content/player-details-charts/player-details-charts.component';
import { PlayerDetailsContentComponent } from './view/player-details-content/player-details-content.component';
import { PlayerDetailsMainComponent } from './view/player-details-content/player-details-main/player-details-main.component';
import { PlayerDetailsMatchdaysComponent } from './view/player-details-content/player-details-matchdays/player-details-matchdays.component';
import { PlayerDetailsNextMatchdayComponent } from './view/player-details-content/player-details-next-matchday/player-details-next-matchday.component';
import { PlayerDetailsTopGamesComponent } from './view/player-details-content/player-details-top-games/player-details-top-games.component';

@NgModule({
  declarations: [
    PlayerDetailsContentComponent,
    PlayerDetailsMainComponent,
    PlayerDetailsMatchdaysComponent,
    PlayerDetailsNextMatchdayComponent,
    PlayerDetailsTopGamesComponent,
    PlayerDetailsChartsComponent
  ],
  imports: [CommonModule, PlayerDetailsRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    PlayerDetailsResolver,
    PlayerDetailsLoader,
    PlayerDetailsTeamCreator,
    PlayerDetailsFantasyCreator,
    PlayerDetailsGamesCreator,
    PlayerDetailsFabric,
    PlayerDetailsNextGameCreator,
    PositionsStatsResolver,
    PositionsStatsLoadedGuard
  ]
})
export class PlayerDetailsModule {}
