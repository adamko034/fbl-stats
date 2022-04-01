import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesFirstGamesRoutingModule } from './fixtures-first-games-routing.module';
import { FixturesFirstGamesMatchdaysLoader } from './logic/fixtures-first-games-matchdays.loader';
import { FixturesFirstGamesTeamsLoader } from './logic/fixtures-first-games-teams.loader';
import { FixturesFirstGamesResolver } from './resolvers/fixtures-first-games.resolver';
import { FixturesFirstGamesFiltersService } from './services/fixtures-first-games-filters.service';
import { FixturesFirstGamesFiltersComponent } from './view/fixtures-first-games-filters/fixtures-first-games-filters.component';
import { FixturesFirstGamesMatchdaysComponent } from './view/fixtures-first-games-matchdays/fixtures-first-games-matchdays.component';
import { FixturesFirstGamesTeamsComponent } from './view/fixtures-first-games-teams/fixtures-first-games-teams.component';
import { FixturesFirstGamesComponent } from './view/fixtures-first-games.component';

@NgModule({
  declarations: [
    FixturesFirstGamesComponent,
    FixturesFirstGamesTeamsComponent,
    FixturesFirstGamesMatchdaysComponent,
    FixturesFirstGamesFiltersComponent
  ],
  imports: [CommonModule, FixturesFirstGamesRoutingModule, SharedModule, AngularMaterialModule],
  providers: [
    FixturesFirstGamesResolver,
    FixturesFirstGamesFiltersService,
    FixturesFirstGamesTeamsLoader,
    FixturesFirstGamesMatchdaysLoader
  ]
})
export class FixturesFirstGamesModule {}
