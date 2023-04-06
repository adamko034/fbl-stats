import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastMatchdayResolver } from 'src/app/common/routing/resolvers/last-matchday/last-matchday.resolver';
import { TeamsResolver } from 'src/app/common/routing/resolvers/teams/teams.resolver';
import { SelectedTeamsResolver } from './resolvers/selected-teams.resolver';
import { TeamsBundesligaTableComponent } from './view/teams-bundesliga-table.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      teams: TeamsResolver,
      lastMatchday: LastMatchdayResolver,
      selectedTeams: SelectedTeamsResolver
    },
    title: 'FBL Bundesliga Table',
    component: TeamsBundesligaTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsBundesligaTableRoutingModule {}
