import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsResolver } from 'src/app/modules/teams/resolvers/teams.resolver';
import { TeamsContentComponent } from 'src/app/modules/teams/teams-content/teams-content.component';
import { TeamsListComponent } from 'src/app/modules/teams/views/teams-list/teams-list.component';
import { TeamsSchedulesByFormComponent } from 'src/app/modules/teams/views/teams-schedules/components/teams-schedules-by-form/teams-schedules-by-form.component';
import { TeamsSchedulesByRankComponent } from 'src/app/modules/teams/views/teams-schedules/components/teams-schedules-by-rank/teams-schedules-by-rank.component';
import { TeamsSchedulesByFormGuard } from 'src/app/modules/teams/views/teams-schedules/guards/teams-schedules-by-form.guard';
import { TeamsSchedulesByFormResolver } from 'src/app/modules/teams/views/teams-schedules/resolvers/teams-schedules-by-form.resolver';
import { TeamsSchedulesByRankResolver } from 'src/app/modules/teams/views/teams-schedules/resolvers/teams-schedules-by-rank.resolver';
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
        component: TeamsSchedulesComponent,
        children: [
          { path: '', redirectTo: 'byRank', pathMatch: 'full' },
          {
            path: 'byRank',
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            component: TeamsSchedulesByRankComponent,
            resolve: { state: TeamsSchedulesByRankResolver }
          },
          {
            path: 'byForm',
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            component: TeamsSchedulesByFormComponent,
            canActivate: [TeamsSchedulesByFormGuard],
            resolve: { state: TeamsSchedulesByFormResolver }
          }
        ]
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
