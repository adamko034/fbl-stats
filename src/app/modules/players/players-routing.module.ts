import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersContentComponent } from 'src/app/modules/players/players-content/players-content/players-content.component';
import { ContentComponent } from 'src/app/modules/players/views/players-fantasy/content.component';
import { PlayersListReturningComponent } from 'src/app/modules/players/views/players-list-returning/players-list-returning.component';
import { PlayersListReturningResolver } from 'src/app/modules/players/views/players-list-returning/resolvers/players-list-returning.resolver';
import { PlayersListSuspensionRiskComponent } from 'src/app/modules/players/views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListSuspensionRiskResolver } from 'src/app/modules/players/views/players-list-suspension-risk/resolvers/players-list-suspension-risk.resolver';
import { PlayersListUnavailableComponent } from 'src/app/modules/players/views/players-list-unavailable/players-list-unavailable.component';
import { PlayersListUnavailableResolver } from 'src/app/modules/players/views/players-list-unavailable/resolvers/players-list-unavailable.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  {
    path: '',
    component: PlayersContentComponent,
    children: [
      {
        path: 'myteam',
        loadChildren: () => import('../my-team/my-team.module').then((m) => m.MyTeamModule)
      },
      {
        path: 'leaders',
        loadChildren: () => import('../leaders/leaders.module').then((m) => m.LeadersModule)
      },
      {
        path: 'our-picks',
        loadChildren: () => import('../our-picks/our-picks.module').then((m) => m.OurPicksModule)
      },
      { path: 'players', component: ContentComponent },
      {
        path: 'lists',
        children: [
          {
            path: 'suspensionrisk',
            resolve: { players: PlayersListSuspensionRiskResolver },
            component: PlayersListSuspensionRiskComponent
          },
          {
            path: 'returning',
            component: PlayersListReturningComponent,
            resolve: { players: PlayersListReturningResolver }
          },
          {
            path: 'unavailable',
            resolve: { players: PlayersListUnavailableResolver },
            component: PlayersListUnavailableComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {}
