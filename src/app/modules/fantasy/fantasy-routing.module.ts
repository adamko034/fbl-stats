import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantasyContentComponent } from './views/fantasy-content/fantasy-content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FantasyContentComponent,
    children: [
      {
        path: 'players',
        loadChildren: () => import('./players/players.module').then((m) => m.PlayersModule)
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
        path: 'stats',
        loadChildren: () => import('./players-stats/players-stats.module').then((m) => m.PlayersStatsModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then((m) => m.HistoryModule)
      },
      {
        path: 'usefullinks',
        loadChildren: () => import('./useful-links/useful-links.module').then((m) => m.UsefulLinksModule)
      },
      {
        path: 'tips',
        loadChildren: () => import('./matchday-tips/matchday-tips.module').then((m) => m.MatchdayTipsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FantasyRoutingModule {}
