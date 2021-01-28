import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PredictedLineupsLoadedGuard } from 'src/app/modules/lineups/guards/predicted-lineups-loaded.guard';
import { PredictedLineupsSourcesResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupTeamResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsStore } from 'src/app/modules/lineups/store/predicted-lineups.store';
import { PredictedLineupsTeamComponent } from 'src/app/modules/lineups/views/predicted-lineups-team/predicted-lineups-team.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PredictedLineupsContentComponent } from './predicted-lineups-content/predicted-lineups-content.component';
import { PredictedLineupsRoutingModule } from './predicted-lineups-routing.module';
import { PredictedLineupsTeamContentComponent } from './views/predicted-lineups-team/predicted-lineups-team-content/predicted-lineups-team-content.component';
import { PredictedLineupsTeamNavigationComponent } from './views/predicted-lineups-team/predicted-lineups-team-navigation/predicted-lineups-team-navigation.component';
import { PredictedLineupsSourcesComponent } from './views/predicted-lineups-teams/predicted-lineups-sources/predicted-lineups-sources.component';
import { PredictedLineupsTeamsComponent } from './views/predicted-lineups-teams/predicted-lineups-teams.component';
import { PredictedLineupsMatchdayComponent } from './views/predicted-lineups-teams/predicted-lineups-matchday/predicted-lineups-matchday.component';

@NgModule({
  declarations: [
    PredictedLineupsContentComponent,
    PredictedLineupsTeamsComponent,
    PredictedLineupsTeamNavigationComponent,
    PredictedLineupsTeamContentComponent,
    PredictedLineupsTeamComponent,
    PredictedLineupsSourcesComponent,
    PredictedLineupsMatchdayComponent
  ],
  imports: [CommonModule, PredictedLineupsRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    PredictedLineupsStore,
    PredictedLineupsSourcesResolver,
    PredictedLineupsLoadedGuard,
    PredictedLineupTeamResolver
  ]
})
export class PredictedLineupsModule {}
