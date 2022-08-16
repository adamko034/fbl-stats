import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayerIconSuspensionRiskModule } from 'src/app/common/players/components/player-icon-suspension-risk/player-icon-suspension-risk.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersPointsEffciencyResolver } from '../../players-stats/players-points-efficiency/resolvers/players-points-efficiency.resolver';
import { PlayersListBaseComponent } from './components/players-list-base/players-list-base.component';
import { PlayersListsLoader } from './loaders/players-lists.loader';
import { PlayersListsRoutingModule } from './players-lists-routing.module';
import { PlayersListReturningResolver } from './resolvers/players-list-returning.resolver';
import { PlayersListSuspensionRiskResolver } from './resolvers/players-list-suspension-risk.resolver';
import { PlayersListUnavailableResolver } from './resolvers/players-list-unavailable.resolver';
import { PlayersListReturningComponent } from './views/players-list-returning/players-list-returning.component';
import { PlayersListSuspensionRiskComponent } from './views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListUnavailableComponent } from './views/players-list-unavailable/players-list-unavailable.component';

@NgModule({
  declarations: [
    PlayersListBaseComponent,
    PlayersListSuspensionRiskComponent,
    PlayersListReturningComponent,
    PlayersListUnavailableComponent
  ],
  imports: [
    CommonModule,
    PlayersListsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FblCoreModule,
    PlayerIconSuspensionRiskModule,
    PlayerNameLinkModule,
    TeamLogoModule
  ],
  providers: [
    PlayersListsLoader,
    PlayersListReturningResolver,
    PlayersListUnavailableResolver,
    PlayersListSuspensionRiskResolver,
    PlayersPointsEffciencyResolver
  ]
})
export class PlayersListsModule {}
