import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirstGamesByMatchdayComponent } from './components/first-games-by-matchday/first-games-by-matchday.component';
import { FirstGamesByTeamsComponent } from './components/first-games-by-teams/first-games-by-teams.component';
import { FixturesFirstGamesRoutingModule } from './fixtures-first-games-routing.module';
import { FixturesFirstGamesResolver } from './resolvers/fixtures-first-games.resolver';
import { NextMatchdaysFirstGamesResolver } from './resolvers/next-matchdays-first-games.resolver';
import { TeamsMatchdaysFirstGamesResolver } from './resolvers/teams-matchdays-first-games.resolver';
import { TeamMatchdaysFirstsGamesLoader } from './resolvers/teams-matchdays-firsts-games.loader';
import { FixturesFirstGamesFiltersService } from './services/fixtures-first-games-filters.service';
import { FixturesFirstGamesFiltersComponent } from './view/fixtures-first-games-filters/fixtures-first-games-filters.component';
import { FixturesFirstGamesFixturesComponent } from './view/fixtures-first-games-fixtures/fixtures-first-games-fixtures.component';
import { FixturesFirstGamesMatchdaysComponent } from './view/fixtures-first-games-matchdays/fixtures-first-games-matchdays.component';
import { FixturesFirstGamesTeamsComponent } from './view/fixtures-first-games-teams/fixtures-first-games-teams.component';
import { FixturesFirstGamesComponent } from './view/fixtures-first-games.component';
import { MatchdaysFirstGamesComponent } from './view/matchdays-first-games/matchdays-first-games.component';

@NgModule({
  declarations: [
    MatchdaysFirstGamesComponent,
    FirstGamesByMatchdayComponent,
    FirstGamesByTeamsComponent,
    FixturesFirstGamesComponent,
    FixturesFirstGamesTeamsComponent,
    FixturesFirstGamesMatchdaysComponent,
    FixturesFirstGamesFixturesComponent,
    FixturesFirstGamesFiltersComponent
  ],
  imports: [CommonModule, FixturesFirstGamesRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    NextMatchdaysFirstGamesResolver,
    TeamsMatchdaysFirstGamesResolver,
    TeamMatchdaysFirstsGamesLoader,
    FixturesFirstGamesResolver,
    FixturesFirstGamesFiltersService
  ]
})
export class FixturesFirstGamesModule {}
