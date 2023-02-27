import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { ChartModule } from 'src/app/common/components/ui/chart/chart.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { PieChartModule } from 'src/app/common/components/ui/pie-chart/pie-chart.module';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { PlayerIconLineupPredictionModule } from 'src/app/common/players/components/player-icon-lineup-prediction/player-icon-lineup-prediction.module';
import { PlayerIconSuspensionRiskModule } from 'src/app/common/players/components/player-icon-suspension-risk/player-icon-suspension-risk.module';
import { PlayersServicesModule } from 'src/app/common/players/services/players-services.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
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
import { PlayerDetailsPointsByVenueComponent } from './view/player-details-content/player-details-points/player-details-points-by-venue/player-details-points-by-venue.component';
import { PlayerDetailsPointsEfficiencyComponent } from './view/player-details-content/player-details-points/player-details-points-efficiency/player-details-points-efficiency.component';
import { PlayerDetailsPointsComponent } from './view/player-details-content/player-details-points/player-details-points.component';
import { PlayerDetailsTopGamesComponent } from './view/player-details-content/player-details-points/player-details-top-games/player-details-top-games.component';
import { PlayerDetailsTitleComponent } from './view/player-details-content/player-details-title/player-details-title.component';
import { PlayersDetailsFantasyStatsComponent } from './view/player-details-content/players-details-fantasy-stats/players-details-fantasy-stats.component';

@NgModule({
  declarations: [
    PlayerDetailsContentComponent,
    PlayerDetailsMainComponent,
    PlayerDetailsMatchdaysComponent,
    PlayerDetailsNextMatchdayComponent,
    PlayerDetailsTopGamesComponent,
    PlayerDetailsChartsComponent,
    PlayerDetailsPointsComponent,
    PlayerDetailsPointsByVenueComponent,
    PlayerDetailsPointsEfficiencyComponent,
    PlayerDetailsTitleComponent,
    PlayersDetailsFantasyStatsComponent
  ],
  imports: [
    CommonModule,
    PlayerDetailsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FblCoreModule,
    PlayersServicesModule,
    PlayerIconSuspensionRiskModule,
    PlayerIconLineupPredictionModule,
    PipesModule,
    ScaleModule,
    StickyModule,
    TeamLogoModule,
    MatchdayFirstGameIconModule,
    ChartModule,
    PieChartModule,
    AdBannerModule,
    LegendModule,
    PipesModule
  ],
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
