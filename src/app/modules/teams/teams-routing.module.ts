import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsSchedulesResolver } from 'src/app/modules/teams/resolvers/teams-schedules.resolver';
import { TeamsResolver } from 'src/app/modules/teams/resolvers/teams.resolver';
import { TeamsContentComponent } from 'src/app/modules/teams/teams-content/teams-content.component';
import { TeamsListComponent } from 'src/app/modules/teams/views/teams-list/teams-list.component';
import { TeamsSchedulesComponent } from 'src/app/modules/teams/views/teams-schedules/teams-schedules.component';
import { TeamsTableContainerComponent } from 'src/app/modules/teams/views/teams-table/teams-table-container.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsContentComponent,
    children: [
      {
        path: 'list',
        component: TeamsListComponent
      },
      {
        path: 'schedules',
        resolve: { state: TeamsSchedulesResolver },
        component: TeamsSchedulesComponent
      },
      {
        path: 'table',
        resolve: { state: TeamsResolver },
        component: TeamsTableContainerComponent
      },
      { path: '', redirectTo: 'table', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
