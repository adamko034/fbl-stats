import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextMatchdaysFirstGamesResolver } from './resolvers/next-matchdays-first-games.resolver';
import { TeamsMatchdaysFirstGamesResolver } from './resolvers/teams-matchdays-first-games.resolver';
import { MatchdaysFirstGamesComponent } from './view/matchdays-first-games/matchdays-first-games.component';

const routes: Routes = [
  {
    path: '',
    component: MatchdaysFirstGamesComponent,
    resolve: { matchdays: NextMatchdaysFirstGamesResolver, teams: TeamsMatchdaysFirstGamesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaFirstGamesRoutingModule {}
