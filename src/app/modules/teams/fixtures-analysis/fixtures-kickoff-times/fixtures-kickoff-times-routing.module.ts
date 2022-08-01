import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextUnlimitedTransfersResover } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.resolver';
import { PropertiesResolver } from 'src/app/common/routing/resolvers/properties-resolver/properties.resolver';
import { TeamsResolver } from 'src/app/common/routing/resolvers/teams/teams.resolver';
import { FixturesKickoffTimesComponent } from './view/fixtures-kickoff-times.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesKickoffTimesComponent,
    resolve: {
      teams: TeamsResolver,
      properties: PropertiesResolver,
      nextUnlimitedTransfers: NextUnlimitedTransfersResover
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesKickoffTimesRoutingModule {}
