import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsSchedulesResolver } from 'src/app/modules/teams/resolvers/teams-schedules.resolver';
import { TeamsContentComponent } from 'src/app/modules/teams/teams-content/teams-content.component';
import { TeamsSchedulesComponent } from 'src/app/modules/teams/views/teams-schedules/teams-schedules.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsContentComponent,
    children: [
      {
        path: '',
        resolve: { state: TeamsSchedulesResolver },
        component: TeamsSchedulesComponent
      },
      { path: 'schedules', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
