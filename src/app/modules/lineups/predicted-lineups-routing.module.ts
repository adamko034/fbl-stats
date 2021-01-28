import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextMatchdayResolver } from 'src/app/modules/core/resolvers/next-matchday.resolver';
import { TeamsResolver } from 'src/app/modules/core/resolvers/teams.resolver';
import { PredictedLineupsLoadedGuard } from 'src/app/modules/lineups/guards/predicted-lineups-loaded.guard';
import { PredictedLineupsContentComponent } from 'src/app/modules/lineups/predicted-lineups-content/predicted-lineups-content.component';
import { PredictedLineupsSourcesResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupTeamResolver } from 'src/app/modules/lineups/resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsTeamComponent } from 'src/app/modules/lineups/views/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedLineupsTeamsComponent } from 'src/app/modules/lineups/views/predicted-lineups-teams/predicted-lineups-teams.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [PredictedLineupsLoadedGuard],
    component: PredictedLineupsContentComponent,
    resolve: { teams: TeamsResolver },
    children: [
      {
        path: 'teams',
        component: PredictedLineupsTeamsComponent,
        resolve: { sources: PredictedLineupsSourcesResolver, matchday: NextMatchdayResolver }
      },
      {
        path: 'teams/:team',
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
