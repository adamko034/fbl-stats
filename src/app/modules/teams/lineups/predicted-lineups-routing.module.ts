import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamPlayersResolver } from '../../core/resolvers/team-players.resolver';
import { TeamsResolver } from '../../core/resolvers/teams.resolver';
import { PredictedLineupsLoadedGuard } from './guards/predicted-lineups-loaded.guard';
import { PredictedLineupsSourcesResolver } from './resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupsStasPlayersResolver } from './resolvers/predicted-lineups-stats-players.resolver';
import { PredictedLineupTeamResolver } from './resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsContentComponent } from './views/predicted-lineups/predicted-lineups-content.component';
import { PredictedLineupsMainComponent } from './views/predicted-lineups/predicted-lineups-main/predicted-lineups-main.component';
import { PredictedLineupsTeamComponent } from './views/predicted-lineups/predicted-lineups-team/predicted-lineups-team.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [PredictedLineupsLoadedGuard],
    component: PredictedLineupsContentComponent,
    resolve: { teams: TeamsResolver },
    children: [
      {
        path: '',
        component: PredictedLineupsMainComponent,
        resolve: {
          sources: PredictedLineupsSourcesResolver,
          stats: PredictedLineupsStasPlayersResolver
        }
      },
      {
        path: ':team',
        component: PredictedLineupsTeamComponent,
        resolve: { teamPredictions: PredictedLineupTeamResolver, players: TeamPlayersResolver }
      }
    ]
  },
  {
    path: '',
    redirectTo: 'teams',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictedLineupsRoutingModule {}
