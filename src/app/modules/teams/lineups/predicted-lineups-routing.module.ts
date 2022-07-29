import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { PlayersResolver } from '../../core/resolvers/players.resolver';
import { TeamPlayersResolver } from '../../core/resolvers/team-players.resolver';
import { TeamsNavigationResolver } from '../../core/resolvers/teams-navigation.resolver';
import { PredictedLineupsLoadedGuard } from './guards/predicted-lineups-loaded.guard';
import { PredictedLineupsSourcesTeamsResolver } from './resolvers/predicted-lineups-sources-teams.resolver';
import { PredictedLineupsSourcesResolver } from './resolvers/predicted-lineups-sources.resolver';
import { PredictedLineupsStasPlayersResolver } from './resolvers/predicted-lineups-stats-players.resolver';
import { PredictedLineupTeamResolver } from './resolvers/predicted-lineups-team.resolver';
import { PredictedLineupsSourcesComponent } from './view/predicted-lineups-sources/predicted-lineups-sources.component';
import { PredictedLineupsTeamComponent } from './view/predicted-lineups-team/predicted-lineups-team.component';
import { PredictedLineupsTeamsComponent } from './view/predicted-lineups-teams/predicted-lineups-teams.component';
import { PredictedLineupsComponent } from './view/predicted-lineups.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'next/summary',
    pathMatch: 'full'
  },
  {
    path: 'next',
    redirectTo: 'next/summary',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [PredictedLineupsLoadedGuard],
    component: PredictedLineupsComponent,
    children: [
      {
        path: 'next/summary',
        component: PredictedLineupsTeamsComponent,
        resolve: {
          sources: PredictedLineupsSourcesResolver,
          stats: PredictedLineupsStasPlayersResolver,
          players: PlayersResolver,
          teamsNavigation: TeamsNavigationResolver,
          lastMatchday: LastMatchdayResolver
        }
      },
      {
        path: 'next/:team',
        component: PredictedLineupsTeamComponent,
        resolve: {
          teamsNavigation: TeamsNavigationResolver,
          teamPredictions: PredictedLineupTeamResolver,
          players: TeamPlayersResolver
        }
      },
      {
        path: 'sources',
        component: PredictedLineupsSourcesComponent,
        resolve: {
          sources: PredictedLineupsSourcesResolver,
          teams: PredictedLineupsSourcesTeamsResolver
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
