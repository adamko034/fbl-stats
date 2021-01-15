import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { PlayersNavigationComponent } from 'src/app/modules/players/players-content/components/players-navigation/players-navigation.component';
import { PlayersListsLoader } from 'src/app/modules/players/services/players-lists.loader';
import { PlayersFilterMatchdaysComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-matchdays/players-filter-matchdays.component';
import { PlayersFilterMaxPriceComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-max-price/players-filter-max-price.component';
import { PlayersFilterPopularityComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-popularity/players-filter-popularity.component';
import { PlayersFilterPositionComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-position/players-filter-position.component';
import { SelectTeamsDialogComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/components/select-teams-dialog/select-teams-dialog.component';
import { SelectTeamsFromTableComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/components/select-teams-from-table/select-teams-from-table.component';
import { SmartTeamsSelectionDialogComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/components/smart-teams-selection-dialog/smart-teams-selection-dialog.component';
import { PlayersFilterTeamsComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/players-filter-teams.component';
import { PlayersFiltersComponent } from 'src/app/modules/players/views/players-fantasy/components/players-filters/players-filters.component';
import { PlayersTableContainerComponent } from 'src/app/modules/players/views/players-fantasy/components/players-table-container/players-table-container.component';
import { ContentComponent } from 'src/app/modules/players/views/players-fantasy/content.component';
import { PlayersListReturningResolver } from 'src/app/modules/players/views/players-list-returning/resolvers/players-list-returning.resolver';
import { PlayersListSuspensionRiskComponent } from 'src/app/modules/players/views/players-list-suspension-risk/players-list-suspension-risk.component';
import { PlayersListSuspensionRiskResolver } from 'src/app/modules/players/views/players-list-suspension-risk/resolvers/players-list-suspension-risk.resolver';
import { PlayersListUnavailableResolver } from 'src/app/modules/players/views/players-list-unavailable/resolvers/players-list-unavailable.resolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersListBaseComponent } from './components/players-list-base/players-list-base.component';
import { PlayersContentComponent } from './players-content/players-content/players-content.component';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersListReturningComponent } from './views/players-list-returning/players-list-returning.component';
import { PlayersListUnavailableComponent } from './views/players-list-unavailable/players-list-unavailable.component';

@NgModule({
  declarations: [
    PlayersFiltersComponent,
    PlayersTableContainerComponent,
    ContentComponent,
    PlayersFilterMaxPriceComponent,
    PlayersFilterPopularityComponent,
    PlayersFilterTeamsComponent,
    SmartTeamsSelectionDialogComponent,
    SelectTeamsFromTableComponent,
    PlayersFiltersComponent,
    SelectTeamsDialogComponent,
    PlayersFilterPositionComponent,
    PlayersFilterMatchdaysComponent,
    PlayersNavigationComponent,
    PlayersListSuspensionRiskComponent,
    PlayersContentComponent,
    PlayersListUnavailableComponent,
    PlayersListReturningComponent,
    PlayersListBaseComponent
  ],
  imports: [CommonModule, PlayersRoutingModule, SharedModule, FblCoreModule, FlexLayoutModule, AngularMaterialModule],
  providers: [
    PlayersListsLoader,
    PlayersListReturningResolver,
    PlayersListSuspensionRiskResolver,
    PlayersListUnavailableResolver
  ]
})
export class PlayersModule {}
