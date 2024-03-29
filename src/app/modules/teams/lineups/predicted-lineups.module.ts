import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { ChartModule } from 'src/app/common/components/ui/chart/chart.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { TimeAgoModule } from 'src/app/common/components/ui/time-ago/time-ago.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { PlayerIconLineupPredictionModule } from 'src/app/common/players/components/player-icon-lineup-prediction/player-icon-lineup-prediction.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { PlayersPredictionsTableModule } from 'src/app/common/players/components/players-predictions-table/players-predictions-table.module';
import { PlayersServicesModule } from 'src/app/common/players/services/players-services.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PredictedLineupsTeamNavigationComponent } from './components/predicted-lineups-team-navigation/predicted-lineups-team-navigation.component';
import { PredictedLineupsStatsPlayerConverter } from './converters/predicted-lineups-stats-player.converter';
import { PredictedLineupsLoadedGuard } from './guards/predicted-lineups-loaded.guard';
import { PredictedLineupsRoutingModule } from './predicted-lineups-routing.module';
import { PredictedLineupsSourcesTeamsResolver } from './resolvers/predicted-lineups-sources-teams.resolver';
import { PredictedLineupsSourcesResolver } from './resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupsStasPlayersResolver } from './resolvers/predicted-lineups-stats-players.resolver';
import { PredictedLineupTeamResolver } from './resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsStore } from './store/predicted-lineups.store';
import { PredictedLineupsSourcesSummaryComponent } from './view/predicted-lineups-sources/predicted-lineups-sources-summary/predicted-lineups-sources-summary.component';
import { PredictedLineupsSourcesTeamsComponent } from './view/predicted-lineups-sources/predicted-lineups-sources-teams/predicted-lineups-sources-teams.component';
import { PredictedLineupsSourcesComponent } from './view/predicted-lineups-sources/predicted-lineups-sources.component';
import { PredictedLineupsTeamComponent } from './view/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedTeamLineupComponent } from './view/predicted-lineups-team/predicted-team-lineup/predicted-team-lineup.component';
import { PredictedLineupsStatsComponent } from './view/predicted-lineups-teams/predicted-lineups-stats/predicted-lineups-stats.component';
import { PredictedLineupsTeamsComponent } from './view/predicted-lineups-teams/predicted-lineups-teams.component';
import { PredictedLineupsComponent } from './view/predicted-lineups.component';

@NgModule({
  declarations: [
    PredictedLineupsComponent,
    PredictedLineupsTeamNavigationComponent,
    PredictedLineupsTeamComponent,
    PredictedLineupsTeamsComponent,
    PredictedTeamLineupComponent,
    PredictedLineupsStatsComponent,
    PredictedLineupsSourcesSummaryComponent,
    PredictedLineupsSourcesComponent,
    PredictedLineupsSourcesTeamsComponent
  ],
  imports: [
    CommonModule,
    PredictedLineupsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FblCoreModule,
    LastMatchdayResolverModule,
    PlayerIconLineupPredictionModule,
    PipesModule,
    PlayerNameLinkModule,
    TeamLogoModule,
    ChartModule,
    TimeAgoModule,
    StickyModule,
    LegendModule,
    AdBannerModule,
    IfScreenModule,
    PlayersPredictionsTableModule,
    PlayersServicesModule,
    CommonGuardsModule
  ],
  providers: [
    PredictedLineupsStore,
    PredictedLineupsSourcesResolver,
    PredictedLineupsLoadedGuard,
    PredictedLineupTeamResolver,
    PredictedLineupsStasPlayersResolver,
    PredictedLineupsStatsPlayerConverter,
    PredictedLineupsSourcesTeamsResolver
  ]
})
export class PredictedLineupsModule {}
