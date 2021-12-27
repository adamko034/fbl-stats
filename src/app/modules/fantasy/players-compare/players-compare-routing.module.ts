import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersCompareStateResolver } from './routing/players-compare-state.resolver';
import { PlayersCompareComponent } from './view/players-compare.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersCompareComponent,
    resolve: { state: PlayersCompareStateResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersCompareRoutingModule {}
