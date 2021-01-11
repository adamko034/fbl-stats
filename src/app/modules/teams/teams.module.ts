import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { TeamsResolver } from 'src/app/modules/teams/resolvers/teams.resolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsNavigationComponent } from './teams-content/components/teams-navigation/teams-navigation.component';
import { TeamsContentComponent } from './teams-content/teams-content.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './views/teams-list/teams-list.component';
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
    TeamsTableContainerComponent
  ],
  imports: [SharedModule, CoreModule, CommonModule, TeamsRoutingModule, AngularMaterialModule, FblCoreModule],
  providers: [TeamsResolver]
})
export class TeamsModule {}
