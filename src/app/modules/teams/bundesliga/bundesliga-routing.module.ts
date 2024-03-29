import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundesligaContentComponent } from './views/bundesliga-content/bundesliga-content.component';

const routes: Routes = [
  {
    path: '',
    component: BundesligaContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
      },
      {
        path: 'table',
        loadChildren: () => import('./table/teams-bundesliga-table.module').then((m) => m.TeamsBundesligaTableModule)
      },
      {
        path: 'fixtures',
        loadChildren: () => import('./fixtures/fixtures.module').then((m) => m.FixturesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaRoutingModule {}
