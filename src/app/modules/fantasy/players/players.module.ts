import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PlayersFilterMatchdaysComponent } from './components/players-filter-matchdays/players-filter-matchdays.component';
import { PlayersFilterMaxPriceComponent } from './components/players-filter-max-price/players-filter-max-price.component';
import { PlayersFilterPopularityComponent } from './components/players-filter-popularity/players-filter-popularity.component';
import { PlayersFilterPositionComponent } from './components/players-filter-position/players-filter-position.component';
import { PlayersFilterTeamsComponent } from './components/players-filter-teams/players-filter-teams.component';
import { SelectTeamsDialogComponent } from './components/players-filter-teams/select-teams-dialog/select-teams-dialog.component';
import { SelectTeamsFromTableComponent } from './components/players-filter-teams/select-teams-from-table/select-teams-from-table.component';
import { SmartTeamsSelectionDialogComponent } from './components/players-filter-teams/smart-teams-selection-dialog/smart-teams-selection-dialog.component';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersDataService } from '../../core/players/services/players-data.service';
import { PlayersFilteringService } from './services/players-filtering.service';
import { SmartSelectionTeamsService } from './services/smart-selection-teams.service';
import { PlayersContentComponent } from './views/players-content/players-content.component';
import { PlayersFiltersComponent } from './views/players-content/players-filters/players-filters.component';
import { PlayersTableContainerComponent } from './views/players-content/players-table-container/players-table-container.component';

@NgModule({
  declarations: [
    PlayersFiltersComponent,
    PlayersTableContainerComponent,
    PlayersContentComponent,
    PlayersFilterMaxPriceComponent,
    PlayersFilterPopularityComponent,
    PlayersFilterTeamsComponent,
    SmartTeamsSelectionDialogComponent,
    SelectTeamsFromTableComponent,
    PlayersFiltersComponent,
    SelectTeamsDialogComponent,
    PlayersFilterPositionComponent,
    PlayersFilterMatchdaysComponent
  ],
  imports: [CommonModule, PlayersRoutingModule, SharedModule, FblCoreModule, FlexLayoutModule, AngularMaterialModule],
  providers: [PlayersDataService, PlayersFilteringService, SmartSelectionTeamsService]
})
export class PlayersModule {}
