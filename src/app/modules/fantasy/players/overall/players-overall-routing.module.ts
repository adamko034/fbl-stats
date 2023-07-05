import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamLoadedGuard } from 'src/app/common/my-team/routing/guards/my-team-loaded.guard';
import { PageTitleGuard } from 'src/app/common/routing/guards/page-title/page-title.guard';
import { PlayersResolver } from 'src/app/common/routing/resolvers/players-resolver/players.resolver';
import { PropertiesResolver } from 'src/app/common/routing/resolvers/properties-resolver/properties.resolver';
import { TeamsResolver } from 'src/app/common/routing/resolvers/teams/teams.resolver';
import { PlayersOverallContentComponent } from './views/players-overall-content.component';

const title = 'Players Overall';

const routes: Routes = [
  {
    path: '',
    component: PlayersOverallContentComponent,
    title: title,
    data: { pageTitle: title },
    canActivate: [PageTitleGuard, MyTeamLoadedGuard],
    resolve: { players: PlayersResolver, teams: TeamsResolver, properties: PropertiesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersOverallRoutingModule {}
