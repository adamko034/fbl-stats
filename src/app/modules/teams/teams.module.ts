import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SchedulesComponent } from 'src/app/modules/teams/views/teams-schedules/components/shared/schedules/schedules.component';
import { TeamsSchedulesByFormGuard } from 'src/app/modules/teams/views/teams-schedules/guards/teams-schedules-by-form.guard';
import { TeamsSchedulesLoader } from 'src/app/modules/teams/views/teams-schedules/loaders/teams-schedules.loader';
import { TeamsSchedulesByFormResolver } from 'src/app/modules/teams/views/teams-schedules/resolvers/teams-schedules-by-form.resolver';
import { TeamsSchedulesByRankResolver } from 'src/app/modules/teams/views/teams-schedules/resolvers/teams-schedules-by-rank.resolver';
import { TeamScheduleColorsService } from 'src/app/modules/teams/views/teams-schedules/services/team-schedule-colors.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsNavigationComponent } from './teams-content/components/teams-navigation/teams-navigation.component';
import { TeamsContentComponent } from './teams-content/teams-content.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './views/teams-list/teams-list.component';
import { SchedulesIncludeVenueFilterComponent } from './views/teams-schedules/components/shared/schedules-include-venue-filter/schedules-include-venue-filter.component';
import { SchedulesSortComponent } from './views/teams-schedules/components/shared/schedules-sort/schedules-sort.component';
import { SchedulesTableComponent } from './views/teams-schedules/components/shared/schedules-table/schedules-table.component';
import { TeamsSchedulesByFormComponent } from './views/teams-schedules/components/teams-schedules-by-form/teams-schedules-by-form.component';
import { TeamsSchedulesByRankComponent } from './views/teams-schedules/components/teams-schedules-by-rank/teams-schedules-by-rank.component';
import { TeamsSchedulesComponent } from './views/teams-schedules/teams-schedules.component';
import { TeamsTableFiltersComponent } from './views/teams-table/components/teams-table-filters/teams-table-filters.component';
import { TeamsTableComponent } from './views/teams-table/components/teams-table/teams-table.component';
import { TeamsTableContainerComponent } from './views/teams-table/teams-table-container.component';

@NgModule({
  declarations: [
    TeamsContentComponent,
    TeamsSchedulesComponent,
    TeamsListComponent,
    TeamsTableComponent,
    TeamsNavigationComponent,
    TeamsTableFiltersComponent,
    TeamsTableContainerComponent,
    TeamsSchedulesByRankComponent,
    TeamsSchedulesByFormComponent,
    SchedulesComponent,
    SchedulesSortComponent,
    SchedulesIncludeVenueFilterComponent,
    SchedulesTableComponent
  ],
  imports: [SharedModule, CoreModule, CommonModule, TeamsRoutingModule, AngularMaterialModule, FblCoreModule],
  providers: [
    TeamsSchedulesByRankResolver,
    TeamsSchedulesByFormResolver,
    TeamsSchedulesLoader,
    TeamsSchedulesByFormGuard,
    TeamScheduleColorsService
  ]
})
export class TeamsModule {}
