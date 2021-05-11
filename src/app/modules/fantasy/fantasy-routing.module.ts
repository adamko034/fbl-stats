import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantasyContentComponent } from './views/fantasy-content/fantasy-content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FantasyContentComponent,
    children: [
      {
        path: 'all',
        loadChildren: () => import('./players/players.module').then((m) => m.PlayersModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./player-details/player-details.module').then((m) => m.PlayerDetailsModule)
      },
      {
        path: 'leaders',
        loadChildren: () => import('./leaders/leaders.module').then((m) => m.LeadersModule)
      },
      {
        path: 'myteam',
        loadChildren: () => import('./my-team/my-team.module').then((m) => m.MyTeamModule)
      },
      {
        path: 'our-picks',
        loadChildren: () => import('./our-picks/our-picks.module').then((m) => m.OurPicksModule)
      },
      {
        path: 'lists',
        loadChildren: () => import('./players-lists/players-lists.module').then((m) => m.PlayersListsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FantasyRoutingModule {}
