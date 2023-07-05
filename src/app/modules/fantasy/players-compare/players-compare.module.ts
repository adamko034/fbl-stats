import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MaxPriceSliderModule } from 'src/app/common/components/filters/max-price-slider/max-price-slider.module';
import { PositionSwitchModule } from 'src/app/common/components/filters/position-switch/position-switch.module';
import { SelectFutureMatchdaysPanelModule } from 'src/app/common/components/filters/select-future-matchdays-panel/select-future-matchdays-panel.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { FormFieldModule } from 'src/app/common/components/ui/form-field/form-field.module';
import { MatrixTableModule } from 'src/app/common/components/ui/matrix-table/matrix-table.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { TeamsKickoffTimesService } from 'src/app/common/teams/teams-kickoff-times/services/teams-kickoff-times.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoldableValuesService } from '../../core/boldable-values/boldable-values.service';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PlayersCompareRoutingModule } from './players-compare-routing.module';
import { PlayersCompareIdsCacheGuard } from './routing/players-compare-ids-cache.guard';
import { PlayersCompareQuickLinkGuard } from './routing/players-compare-quick-link.guard';
import { PlayersCompareStateResolver } from './routing/players-compare-state.resolver';
import { PlayersCompareQuickLinkLoaderFactory } from './routing/quick-links/players-compare-quick-link-loader.factory';
import { PlayersCompareFiltersService } from './services/players-compare-filters.service';
import { PlayersCompareIdsCacheService } from './services/players-compare-ids-store.service';
import { PlayersCompareNavigationService } from './services/players-compare-navigation.service';
import { PlayersCompareComparisonGeneralComponent } from './view/players-compare-comparison-general/players-compare-comparison-general.component';
import { PlayersCompareFiltersComponent } from './view/players-compare-filters/players-compare-filters.component';
import { PlayersCompareFixturesDetailsComponent } from './view/players-compare-fixtures/players-compare-fixtures-details/players-compare-fixtures-details.component';
import { PlayersCompareFixturesComponent } from './view/players-compare-fixtures/players-compare-fixtures.component';
import { PlayersCompareKickoffTimesComponent } from './view/players-compare-fixtures/players-compare-kickoff-times/players-compare-kickoff-times.component';
import { PlayersCompareGamesNextComponent } from './view/players-compare-games/players-compare-games-next/players-compare-games-next.component';
import { PlayersCompareGamesPreviousComponent } from './view/players-compare-games/players-compare-games-previous/players-compare-games-previous.component';
import { PlayersCompareGamesComponent } from './view/players-compare-games/players-compare-games.component';
import { PlayersCompareTitleComponent } from './view/players-compare-title/players-compare-title.component';
import { PlayersCompareComponent } from './view/players-compare.component';

@NgModule({
  declarations: [
    PlayersCompareComponent,
    PlayersCompareTitleComponent,
    PlayersCompareComparisonGeneralComponent,
    PlayersCompareKickoffTimesComponent,
    PlayersCompareFixturesComponent,
    PlayersCompareFixturesDetailsComponent,
    PlayersCompareGamesComponent,
    PlayersCompareGamesPreviousComponent,
    PlayersCompareGamesNextComponent,
    PlayersCompareFiltersComponent
  ],
  imports: [
    CommonModule,
    CommonGuardsModule,
    PlayersCompareRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FblCoreModule,
    PositionSwitchModule,
    PipesModule,
    MatrixTableModule,
    SelectFutureMatchdaysPanelModule,
    StickyModule,
    PlayerNameLinkModule,
    TeamLogoModule,
    FormFieldModule,
    MaxPriceSliderModule,
    AdBannerModule,
    IfScreenModule
  ],
  providers: [
    PlayersCompareStateResolver,
    PlayersCompareFiltersService,
    PlayersCompareNavigationService,
    PlayersCompareIdsCacheService,
    PlayersCompareIdsCacheGuard,
    BoldableValuesService,
    PlayersCompareQuickLinkLoaderFactory,
    PlayersCompareQuickLinkGuard,
    TeamsKickoffTimesService
  ]
})
export class PlayersCompareModule {}
