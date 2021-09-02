import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PredictedLineupsTeamNavigationComponent } from './components/predicted-lineups-team-navigation/predicted-lineups-team-navigation.component';
import { PredictedLineupsStatsPlayerConverter } from './converters/predicted-lineups-stats-player.converter';
import { PredictedLineupsLoadedGuard } from './guards/predicted-lineups-loaded.guard';
import { PredictedLineupsRoutingModule } from './predicted-lineups-routing.module';
import { PredictedLineupsSourcesResolver } from './resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupsStasPlayersResolver } from './resolvers/predicted-lineups-stats-players.resolver';
import { PredictedLineupTeamResolver } from './resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsStore } from './store/predicted-lineups.store';
import { PredictedLineupsTeamComponent } from './view/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedTeamLineupComponent } from './view/predicted-lineups-team/predicted-team-lineup/predicted-team-lineup.component';
import { PredictedLineupsSourcesComponent } from './view/predicted-lineups-teams/predicted-lineups-sources/predicted-lineups-sources.component';
import { PredictedLineupsStatsComponent } from './view/predicted-lineups-teams/predicted-lineups-stats/predicted-lineups-stats.component';
import { PredictedLineupsTeamsComponent } from './view/predicted-lineups-teams/predicted-lineups-teams.component';
import { PredictedLineupsComponent } from './view/predicted-lineups.component';
import { PredictedLineupsSourcesSummaryComponent } from './view/predicted-lineups-teams/predicted-lineups-sources-summary/predicted-lineups-sources-summary.component';

@NgModule({
  declarations: [
    PredictedLineupsComponent,
    PredictedLineupsTeamNavigationComponent,
    PredictedLineupsTeamComponent,
    PredictedLineupsTeamsComponent,
    PredictedLineupsSourcesComponent,
    PredictedTeamLineupComponent,
    PredictedLineupsStatsComponent,
    PredictedLineupsSourcesSummaryComponent
  ],
  imports: [CommonModule, PredictedLineupsRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    PredictedLineupsStore,
    PredictedLineupsSourcesResolver,
    PredictedLineupsLoadedGuard,
    PredictedLineupTeamResolver,
    PredictedLineupsStasPlayersResolver,
    PredictedLineupsStatsPlayerConverter
  ]
})
export class PredictedLineupsModule {}
