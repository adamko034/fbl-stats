import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MaxPopularitySliderModule } from '../../components/filters/max-popularity-slider/max-popularity-slider.module';
import { MaxPriceSliderModule } from '../../components/filters/max-price-slider/max-price-slider.module';
import { PositionSwitchModule } from '../../components/filters/position-switch/position-switch.module';
import { PredictionDropdownModule } from '../../components/filters/prediction-dropdown/prediction-dropdown.module';
import { SelectMatchdaysPanelModule } from '../../components/filters/select-matchdays-panel/select-matchdays-panel.module';
import { TeamsSelectModule } from '../../components/filters/teams-select/teams-select.module';
import { CheckboxModule } from '../../components/ui/checkbox/checkbox.module';
import { ContentWhiteBlockModule } from '../../components/ui/content-white-block/content-white-block.module';
import { LegendModule } from '../../components/ui/legend/legend.module';
import { SearchModule } from '../../components/ui/search/search.module';
import { TitleModule } from '../../components/ui/title/title.module';
import { PlayerPointsColorModule } from '../../directives/player-points-color/player-points-color.module';
import { StickyModule } from '../../directives/sticky/sticky.module';
import { PipesModule } from '../../pipes/pipes.module';
import { GameTeamVenueModule } from '../../teams/components/game-team-venue/game-team-venue.module';
import { TeamLogoModule } from '../../teams/team-logo/team-logo.module';
import { PlayerIconPredictionModule } from '../components/player-icon-prediction/player-icon-prediction.module';
import { PlayerIconReturningModule } from '../components/player-icon-returning/player-icon-returning.module';
import { PlayerIconSuspensionRiskModule } from '../components/player-icon-suspension-risk/player-icon-suspension-risk.module';
import { PlayerIconUnavailableModule } from '../components/player-icon-unavailable/player-icon-unavailable.module';
import { PlayerNameLinkModule } from '../components/player-name-link/player-name-link.module';
import { PlayersServicesModule } from '../services/players-services.module';
import { PlayersTableAddOurPickComponent } from './components/players-table-add-our-pick/players-table-add-our-pick.component';
import { PlayersTableFiltersComponent } from './components/players-table-filters/players-table-filters.component';
import { PlayersTableInnerComponent } from './components/players-table-inner/players-table-inner.component';
import { PlayersTableComponent } from './components/players-table.component';
import { PlayersTableFiltersProvider } from './services/players-table-filters-provider.service';
import { PlayersTablePlayersFiltering } from './services/players-table-players-filtering.service';
import { PlayersTablePlayersConverter } from './services/players-table-players.converter';
import { PlayersToPlayersTableConverter } from './services/players-to-player-table-converter';

@NgModule({
  declarations: [
    PlayersTableComponent,
    PlayersTableFiltersComponent,
    PlayersTableInnerComponent,
    PlayersTableAddOurPickComponent
  ],
  imports: [
    CommonModule,
    TitleModule,
    ContentWhiteBlockModule,
    LegendModule,
    MaxPriceSliderModule,
    MaxPopularitySliderModule,
    CheckboxModule,
    SelectMatchdaysPanelModule,
    PositionSwitchModule,
    PredictionDropdownModule,
    TeamsSelectModule,
    PlayersServicesModule,
    SearchModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TeamLogoModule,
    PlayerNameLinkModule,
    PlayerIconReturningModule,
    PlayerIconSuspensionRiskModule,
    PlayerIconUnavailableModule,
    PlayerPointsColorModule,
    GameTeamVenueModule,
    PlayerIconPredictionModule,
    PipesModule,
    StickyModule,
    MatProgressBarModule,
    MatIconModule
  ],
  providers: [
    PlayersTableFiltersProvider,
    PlayersTablePlayersFiltering,
    PlayersTablePlayersConverter,
    PlayersToPlayersTableConverter
  ],
  exports: [PlayersTableComponent]
})
export class PlayersTableModule {}
