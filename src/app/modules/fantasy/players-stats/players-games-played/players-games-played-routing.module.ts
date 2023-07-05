import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { PlayersGamesPlayedResolver } from './resolvers/players-games-played.resolver';
import { PlayersGamesPlayedComponent } from './views/players-games-played/players-games-played.component';

const routes: Routes = [
  {
    path: '',
    title: 'Players Stats: Games Played',
    resolve: { players: PlayersGamesPlayedResolver, lastMatchday: LastMatchdayResolver },
    canActivate: [PageTitleGuard],
    data: { pageTitle: 'Players Stats: Games Played' },
    component: PlayersGamesPlayedComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersGamesPlayedRoutingModule {}
