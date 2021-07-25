import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsResolver } from 'src/app/modules/core/resolvers/teams.resolver';
import { BundesligaTableComponent } from './view/bundesliga-table/bundesliga-table.component';

const routes: Routes = [
  {
    path: '',
    resolve: { allTeams: TeamsResolver },
    component: BundesligaTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaTableRoutingModule {}
