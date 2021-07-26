import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesLoadedGuard } from '../../core/guards/fixtures-loaded.guard';
import { FirstGamesByMatchdayComponent } from './components/first-games-by-matchday/first-games-by-matchday.component';
import { FirstGamesByTeamsComponent } from './components/first-games-by-teams/first-games-by-teams.component';
import { NextMatchdaysFirstGamesResolver } from './resolvers/next-matchdays-first-games.resolver';
import { TeamsMatchdaysFirstGamesResolver } from './resolvers/teams-matchdays-first-games.resolver';
import { MatchdaysFirstGamesComponent } from './view/matchdays-first-games/matchdays-first-games.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [FixturesLoadedGuard],
    component: MatchdaysFirstGamesComponent,
    children: [
      { path: '', redirectTo: 'nextmatchdays', pathMatch: 'full' },
      { path: 'overall', component: FirstGamesByTeamsComponent, resolve: { teams: TeamsMatchdaysFirstGamesResolver } },
      {
        path: 'nextmatchdays',
        component: FirstGamesByMatchdayComponent,
        resolve: { matchdays: NextMatchdaysFirstGamesResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstGamesRoutingModule {}
