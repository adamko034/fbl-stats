import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersListBaseComponent } from './components/players-list-base/players-list-base.component';
import { PlayersListGenericComponent } from './components/players-list-generic/players-list-generic.component';
import { PlayersListsScoringChancesLoader } from './loaders/players-lists-scoring-chances.loader';
import { PlayersListsLoader } from './loaders/players-lists.loader';
import { PlayersListsRoutingModule } from './players-lists-routing.module';
import { PlayersListReturningResolver } from './resolvers/players-list-returning.resolver';
import { PlayersListScoringChancesResolver } from './resolvers/players-list-scoring-chances.resolver';
import { PlayersListSuspensionRiskResolver } from './resolvers/players-list-suspension-risk.resolver';
import { PlayersListUnavailableResolver } from './resolvers/players-list-unavailable.resolver';
import { PlayersListReturningComponent } from './views/players-list-returning/players-list-returning.component';
import { PlayersListScoringChancesComponent } from './views/players-list-scoring-chances/players-list-scoring-chances.component';
import { PlayersListSuspensionRiskComponent } from './views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListUnavailableComponent } from './views/players-list-unavailable/players-list-unavailable.component';

@NgModule({
  declarations: [
    PlayersListBaseComponent,
    PlayersListSuspensionRiskComponent,
    PlayersListReturningComponent,
    PlayersListUnavailableComponent,
    PlayersListScoringChancesComponent,
    PlayersListGenericComponent
  ],
  imports: [CommonModule, PlayersListsRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    PlayersListsLoader,
    PlayersListReturningResolver,
    PlayersListUnavailableResolver,
    PlayersListSuspensionRiskResolver,
    PlayersListScoringChancesResolver,
    PlayersListsScoringChancesLoader
  ]
})
export class PlayersListsModule {}
