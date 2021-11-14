import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsBundesligaTableResolver } from './resolvers/teams-bundesliga-table.resolver';
import { BundesligaTableComponent } from './view/bundesliga-table/bundesliga-table.component';

const routes: Routes = [
  {
    path: '',
    resolve: { teams: TeamsBundesligaTableResolver },
    component: BundesligaTableComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaTableRoutingModule {}
