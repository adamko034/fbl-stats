import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersContentComponent } from './views/players-content/players-content.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'overall',
        pathMatch: 'full'
      },
      { path: 'overall', loadChildren: () => import('./overall/players-overall.module').then((m) => m.PlayersModule) },
      {
        path: 'lists',
        loadChildren: () => import('./players-lists/players-lists.module').then((m) => m.PlayersListsModule)
      }
    ]
  },
  {
    path: 'details',
    loadChildren: () => import('./player-details/player-details.module').then((m) => m.PlayerDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {}
