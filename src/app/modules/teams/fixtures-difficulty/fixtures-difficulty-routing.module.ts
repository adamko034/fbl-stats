import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';
import { FixturesDifficultyComponent } from './view/fixtures-difficulty.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesDifficultyComponent,
    resolve: { state: FixturesDifficultyResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: FixturesDifficultyContentComponent,
//     children: [
//       { path: '', redirectTo: 'byRank', pathMatch: 'full' },
//       {
//         path: 'byRank',
//         runGuardsAndResolvers: 'paramsOrQueryParamsChange',
//         component: FixturesDifficultyByRankComponent,
//         resolve: { state: FixturesDifficultyByRankResolver }
//       },
//       {
//         path: 'byForm',
//         canActivate: [FixturesByFormMatchdaysGuard],
//         runGuardsAndResolvers: 'paramsOrQueryParamsChange',
//         component: FixturesDifficultyByFormComponent,
//         resolve: { state: FixturesDifficultyByFormResolver }
//       }
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesDifficultyRoutingModule {}
