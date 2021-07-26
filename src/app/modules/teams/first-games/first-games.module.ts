import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirstGamesByMatchdayComponent } from './components/first-games-by-matchday/first-games-by-matchday.component';
import { FirstGamesByTeamsComponent } from './components/first-games-by-teams/first-games-by-teams.component';
import { FirstGamesRoutingModule } from './first-games-routing.module';
import { NextMatchdaysFirstGamesResolver } from './resolvers/next-matchdays-first-games.resolver';
import { TeamsMatchdaysFirstGamesResolver } from './resolvers/teams-matchdays-first-games.resolver';
import { TeamMatchdaysFirstsGamesLoader } from './resolvers/teams-matchdays-firsts-games.loader';
import { MatchdaysFirstGamesComponent } from './view/matchdays-first-games/matchdays-first-games.component';

@NgModule({
  declarations: [MatchdaysFirstGamesComponent, FirstGamesByMatchdayComponent, FirstGamesByTeamsComponent],
  imports: [CommonModule, FirstGamesRoutingModule, SharedModule, AngularMaterialModule],
  providers: [NextMatchdaysFirstGamesResolver, TeamsMatchdaysFirstGamesResolver, TeamMatchdaysFirstsGamesLoader]
})
export class FirstGamesModule {}
