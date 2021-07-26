import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PredictedLineupsStatsPlayerConverter } from './converters/predicted-lineups-stats-player.converter';
import { PredictedLineupsLoadedGuard } from './guards/predicted-lineups-loaded.guard';
import { PredictedLineupsRoutingModule } from './predicted-lineups-routing.module';
import { PredictedLineupsSourcesResolver } from './resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupsStasPlayersResolver } from './resolvers/predicted-lineups-stats-players.resolver';
import { PredictedLineupTeamResolver } from './resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsStore } from './store/predicted-lineups.store';
import { PredictedLineupsContentComponent } from './views/predicted-lineups/predicted-lineups-content.component';
import { PredictedLineupsMainComponent } from './views/predicted-lineups/predicted-lineups-main/predicted-lineups-main.component';
import { PredictedLineupsSourcesComponent } from './views/predicted-lineups/predicted-lineups-main/predicted-lineups-sources/predicted-lineups-sources.component';
import { PredictedLineupsStatsComponent } from './views/predicted-lineups/predicted-lineups-main/predicted-lineups-stats/predicted-lineups-stats.component';
import { PredictedLineupsTeamNavigationComponent } from './views/predicted-lineups/predicted-lineups-team-navigation/predicted-lineups-team-navigation.component';
import { PredictedLineupsTeamComponent } from './views/predicted-lineups/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedTeamLineupComponent } from './views/predicted-lineups/predicted-lineups-team/predicted-team-lineup/predicted-team-lineup.component';

@NgModule({
  declarations: [
    PredictedLineupsContentComponent,
    PredictedLineupsTeamNavigationComponent,
    PredictedLineupsTeamComponent,
    PredictedLineupsMainComponent,
    PredictedLineupsSourcesComponent,
    PredictedTeamLineupComponent,
    PredictedLineupsStatsComponent
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
