import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PredictedLineupsLoadedGuard } from 'src/app/modules/lineups/guards/predicted-lineups-loaded.guard';
import { PredictedLineupsContentComponent } from 'src/app/modules/lineups/predicted-lineups-content/predicted-lineups-content.component';
import { PredictedLineupsRoutingModule } from 'src/app/modules/lineups/predicted-lineups-routing.module';
import { PredictedLineupsSourcesResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupTeamResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsStore } from 'src/app/modules/lineups/store/predicted-lineups.store';
import { PredictedLineupsMainComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-main/predicted-lineups-main.component';
import { PredictedLineupsMatchdayComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-main/predicted-lineups-matchday/predicted-lineups-matchday.component';
import { PredictedLineupsSourcesComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-main/predicted-lineups-sources/predicted-lineups-sources.component';
import { PredictedLineupsTeamNavigationComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-team-navigation/predicted-lineups-team-navigation.component';
import { PredictedLineupsTeamComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedLineupsComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamLineupComponent } from './views/predicted-lineups/predicted-lineups-team/team-lineup/team-lineup.component';

@NgModule({
  declarations: [
    PredictedLineupsContentComponent,
    PredictedLineupsTeamNavigationComponent,
    PredictedLineupsTeamComponent,
    PredictedLineupsMatchdayComponent,
    PredictedLineupsComponent,
    PredictedLineupsMainComponent,
    PredictedLineupsSourcesComponent,
    TeamLineupComponent
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
