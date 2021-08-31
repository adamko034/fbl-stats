import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamPlayersResolver } from '../../core/resolvers/team-players.resolver';
import { TeamsNavigationResolver } from '../../core/resolvers/teams-navigation.resolver';
import { PredictedLineupsLoadedGuard } from './guards/predicted-lineups-loaded.guard';
import { PredictedLineupsSourcesResolver } from './resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupsStasPlayersResolver } from './resolvers/predicted-lineups-stats-players.resolver';
import { PredictedLineupTeamResolver } from './resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsTeamComponent } from './view/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedLineupsTeamsComponent } from './view/predicted-lineups-teams/predicted-lineups-teams.component';
import { PredictedLineupsComponent } from './view/predicted-lineups.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams/summary',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [PredictedLineupsLoadedGuard],
    component: PredictedLineupsComponent,
    children: [
      {
        path: 'teams/summary',
        component: PredictedLineupsTeamsComponent,
        resolve: {
          sources: PredictedLineupsSourcesResolver,
          stats: PredictedLineupsStasPlayersResolver,
          teamsNavigation: TeamsNavigationResolver
        }
      },
      {
        path: 'teams/:team',
        component: PredictedLineupsTeamComponent,
        resolve: {
          teamsNavigation: TeamsNavigationResolver,
          teamPredictions: PredictedLineupTeamResolver,
          players: TeamPlayersResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictedLineupsRoutingModule {}
