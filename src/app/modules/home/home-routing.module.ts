import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundesligaNextFixtureResolver } from 'src/app/common/routing/resolvers/bundesliga-next-fixture/bundesliga-next-fixture.resolver';
import { PlayersResolver } from 'src/app/common/routing/resolvers/players-resolver/players.resolver';
import { PropertiesResolver } from 'src/app/common/routing/resolvers/properties-resolver/properties.resolver';
import { TeamsResolver } from 'src/app/common/routing/resolvers/teams/teams.resolver';
import { HomeComponent } from './view/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'FBL Home',
    resolve: {
      players: PlayersResolver,
      properties: PropertiesResolver,
      nextMatchdayFixtures: BundesligaNextFixtureResolver,
      teams: TeamsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
