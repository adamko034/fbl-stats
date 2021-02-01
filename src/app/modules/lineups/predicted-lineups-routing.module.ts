import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextMatchdayResolver } from 'src/app/modules/core/resolvers/next-matchday.resolver';
import { TeamsResolver } from 'src/app/modules/core/resolvers/teams.resolver';
import { PredictedLineupsLoadedGuard } from 'src/app/modules/lineups/guards/predicted-lineups-loaded.guard';
import { PredictedLineupsContentComponent } from 'src/app/modules/lineups/predicted-lineups-content/predicted-lineups-content.component';
import { PredictedLineupsSourcesResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupTeamResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsMainComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-main/predicted-lineups-main.component';
import { PredictedLineupsTeamComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedLineupsComponent } from 'src/app/modules/lineups/views/predicted-lineups/predicted-lineups.component';

const routes: Routes = [
  {
    path: '',
    component: PredictedLineupsContentComponent,
    redirectTo: 'teams',
    pathMatch: 'full'
  },
  {
    path: 'teams',
    canActivate: [PredictedLineupsLoadedGuard],
    component: PredictedLineupsComponent,
    resolve: { teams: TeamsResolver },
    children: [
      {
        path: '',
        component: PredictedLineupsMainComponent,
        resolve: { sources: PredictedLineupsSourcesResolver, matchday: NextMatchdayResolver }
      },
      {
        path: ':team',
        component: PredictedLineupsTeamComponent,
        resolve: { team: PredictedLineupTeamResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictedLineupsRoutingModule {}
