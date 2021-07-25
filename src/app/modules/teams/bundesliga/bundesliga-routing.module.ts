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
        loadChildren: () => import('./table/bundesliga-table.module').then((m) => m.BundesligaTableModule)
      },
      {
        path: 'fixtures',
        loadChildren: () => import('./fixtures/fixtures-routing.module').then((m) => m.FixturesRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundesligaRoutingModule {}
