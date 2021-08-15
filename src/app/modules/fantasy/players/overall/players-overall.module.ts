import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersFilterMatchdaysComponent } from './components/players-filter-matchdays/players-filter-matchdays.component';
import { PlayersFilterMaxPriceComponent } from './components/players-filter-max-price/players-filter-max-price.component';
import { PlayersFilterPopularityComponent } from './components/players-filter-popularity/players-filter-popularity.component';
import { PlayersFilterPositionComponent } from './components/players-filter-position/players-filter-position.component';
import { PlayersFilterTeamsComponent } from './components/players-filter-teams/players-filter-teams.component';
import { SelectTeamsDialogComponent } from './components/players-filter-teams/select-teams-dialog/select-teams-dialog.component';
import { SelectTeamsFromTableComponent } from './components/players-filter-teams/select-teams-from-table/select-teams-from-table.component';
import { SmartTeamsSelectionDialogComponent } from './components/players-filter-teams/smart-teams-selection-dialog/smart-teams-selection-dialog.component';
import { PlayersOverallRoutingModule } from './players-overall-routing.module';
import { PlayersFilteringService } from './services/players-filtering.service';
import { SmartSelectionTeamsService } from './services/smart-selection-teams.service';
import { PlayersFiltersComponent } from './views/players-content/players-filters/players-filters.component';
import { PlayersOverallContentComponent } from './views/players-content/players-overall-content.component';
import { PlayersTableContainerComponent } from './views/players-content/players-table-container/players-table-container.component';
import { PlayersFilterHideUnavailableComponent } from './components/players-filter-hide-unavailable/players-filter-hide-unavailable.component';
import { PlayersFilterPredictionComponent } from './components/players-filter-prediction/players-filter-prediction.component';

@NgModule({
  declarations: [
    PlayersFiltersComponent,
    PlayersTableContainerComponent,
    PlayersOverallContentComponent,
    PlayersFilterMaxPriceComponent,
    PlayersFilterPopularityComponent,
    PlayersFilterTeamsComponent,
    SmartTeamsSelectionDialogComponent,
    SelectTeamsFromTableComponent,
    PlayersFiltersComponent,
    SelectTeamsDialogComponent,
    PlayersFilterPositionComponent,
    PlayersFilterMatchdaysComponent,
    PlayersFilterHideUnavailableComponent,
    PlayersFilterPredictionComponent
  ],
  imports: [
    CommonModule,
    PlayersOverallRoutingModule,
    SharedModule,
    FblCoreModule,
    FlexLayoutModule,
    AngularMaterialModule
  ],
  providers: [PlayersDataService, PlayersFilteringService, SmartSelectionTeamsService]
})
export class PlayersModule {}
