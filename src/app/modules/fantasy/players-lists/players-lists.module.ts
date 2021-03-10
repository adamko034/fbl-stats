import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersListsRoutingModule } from './players-lists-routing.module';
import { PlayersListBaseComponent } from './components/players-list-base/players-list-base.component';
import { PlayersListSuspensionRiskComponent } from './views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListReturningComponent } from './views/players-list-returning/players-list-returning.component';
import { PlayersListUnavailableComponent } from './views/players-list-unavailable/players-list-unavailable.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayersListsLoader } from './loaders/players-lists.loader';
import { PlayersListReturningResolver } from './resolvers/players-list-returning.resolver';
import { PlayersListUnavailableResolver } from './resolvers/players-list-unavailable.resolver';
import { PlayersListSuspensionRiskResolver } from './resolvers/players-list-suspension-risk.resolver';
import { FblCoreModule } from '../../core/fbl-core.module';

@NgModule({
  declarations: [
    PlayersListBaseComponent,
    PlayersListSuspensionRiskComponent,
    PlayersListReturningComponent,
    PlayersListUnavailableComponent
  ],
  imports: [CommonModule, PlayersListsRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    PlayersListsLoader,
    PlayersListReturningResolver,
    PlayersListUnavailableResolver,
    PlayersListSuspensionRiskResolver
  ]
})
export class PlayersListsModule {}
