import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { TeamsNavigationComponent } from '../views/teams-content/components/teams-navigation/teams-navigation.component';
import { BundesligaRoutingModule } from './bundesliga-routing.module';
import { NextMatchdaysFirstGamesLoader } from './first-games/resolvers/next-matchdays-first-games.loader';
import { NextMatchdaysFirstGamesResolver } from './first-games/resolvers/next-matchdays-first-games.resolver';
import { TeamsMatchdaysFirstGamesResolver } from './first-games/resolvers/teams-matchdays-first-games.resolver';
import { TeamMatchdaysFirstsGamesLoader } from './first-games/resolvers/teams-matchdays-firsts-games.loader';
import { FirstGamesByMatchdayComponent } from './first-games/views/matchdays-first-games/components/first-games-by-matchday/first-games-by-matchday.component';
import { FirstGamesByTeamsComponent } from './first-games/views/matchdays-first-games/components/first-games-by-teams/first-games-by-teams.component';
import { MatchdaysFirstGamesComponent } from './first-games/views/matchdays-first-games/matchdays-first-games.component';
import { SchedulesIncludeVenueFilterComponent } from './fixtures-difficulty/components/shared/schedules-include-venue-filter/schedules-include-venue-filter.component';
import { SchedulesSortComponent } from './fixtures-difficulty/components/shared/schedules-sort/schedules-sort.component';
import { SchedulesTableComponent } from './fixtures-difficulty/components/shared/schedules-table/schedules-table.component';
import { SchedulesComponent } from './fixtures-difficulty/components/shared/schedules/schedules.component';
import { TeamsSchedulesByFormComponent } from './fixtures-difficulty/components/teams-schedules-by-form/teams-schedules-by-form.component';
import { TeamsSchedulesByRankComponent } from './fixtures-difficulty/components/teams-schedules-by-rank/teams-schedules-by-rank.component';
import { TeamsSchedulesByFormGuard } from './teams-schedules/guards/teams-schedules-by-form.guard';
import { TeamsSchedulesLoader } from './teams-schedules/loaders/teams-schedules.loader';
import { TeamsSchedulesByFormResolver } from './teams-schedules/resolvers/teams-schedules-by-form.resolver';
import { TeamsSchedulesByRankResolver } from './teams-schedules/resolvers/teams-schedules-by-rank.resolver';
import { TeamScheduleColorsService } from './teams-schedules/services/team-schedule-colors.service';
import { TeamsSchedulesComponent } from './teams-schedules/teams-schedules.component';
import { TeamsTableFiltersComponent } from './teams-table/components/teams-table-filters/teams-table-filters.component';
import { TeamsTableComponent } from './teams-table/components/teams-table/teams-table.component';
import { TeamsTableContainerComponent } from './teams-table/teams-table-container.component';

@NgModule({
  declarations: [
    TeamsSchedulesComponent,
    TeamsTableComponent,
    TeamsNavigationComponent,
    TeamsTableFiltersComponent,
    TeamsTableContainerComponent,
    TeamsSchedulesByRankComponent,
    TeamsSchedulesByFormComponent,
    SchedulesComponent,
    SchedulesSortComponent,
    SchedulesIncludeVenueFilterComponent,
    SchedulesTableComponent,
    MatchdaysFirstGamesComponent,
    FirstGamesByMatchdayComponent,
    FirstGamesByTeamsComponent
  ],
  imports: [CommonModule, BundesligaRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    TeamsSchedulesByRankResolver,
    TeamsSchedulesByFormResolver,
    TeamsSchedulesLoader,
    TeamsSchedulesByFormGuard,
    TeamScheduleColorsService,
    NextMatchdaysFirstGamesLoader,
    NextMatchdaysFirstGamesResolver,
    TeamsMatchdaysFirstGamesResolver,
    TeamMatchdaysFirstsGamesLoader
  ]
})
export class BundesligaModule {}
