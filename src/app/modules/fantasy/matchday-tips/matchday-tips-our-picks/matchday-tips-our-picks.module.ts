import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsOurPicksFiltersExecutor } from './filters/matchday-tips-our-picks-filters-executor';
import { MatchdayTipsOurPicksLoadedGuard } from './guards/matchday-tips-our-picks-loaded.guard';
import { MatchdayTipsOurPicksRoutingModule } from './matchday-tips-our-picks-routing.module';
import { MatchdayTipsOurPicksDisplaySettingsService } from './services/matchday-tips-our-picks-display-settings.service';
import { MatchdayTipsOurPicksFiltersService } from './services/matchday-tips-our-picks-filters.service';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks/matchday-tips-our-picks.component';
import { MatchdayTipsOurPicksDescriptionComponent } from './views/matchday-tips-our-picks/our-picks-description/matchday-tips-our-picks-description.component';
import { MatchdayTipsOurPicksDisplaySettingsComponent } from './views/matchday-tips-our-picks/our-picks-display-settings/matchday-tips-our-picks-display-settings.component';
import { MatchdayTipsOurPicksFilterTypesComponent } from './views/matchday-tips-our-picks/our-picks-filter-types/matchday-tips-our-picks-filter-types.component';
import { MatchdayTipsOurPicksFiltersComponent } from './views/matchday-tips-our-picks/our-picks-filters/matchday-tips-our-picks-filters.component';
import { MatchdayTipsOurPicksPlayersComponent } from './views/matchday-tips-our-picks/our-picks-players/matchday-tips-our-picks-players.component';
import { MatchdayTipsOurPicksPlayersExtendedComponent } from './views/matchday-tips-our-picks/our-picks-players/our-picks-players-extended/matchday-tips-our-picks-players-extended.component';
import { MatchdayTipsOurPicksPlayerExtendedComponent } from './views/matchday-tips-our-picks/our-picks-players/our-picks-players-extended/our-picks-player-extended/matchday-tips-our-picks-player-extended.component';
import { MatchdayTipsOurPicksPlayersSimplifiedComponent } from './views/matchday-tips-our-picks/our-picks-players/our-picks-players-simplified/matchday-tips-our-picks-players-simplified.component';

@NgModule({
  declarations: [
    MatchdayTipsOurPicksPlayersComponent,
    MatchdayTipsOurPicksPlayerExtendedComponent,
    MatchdayTipsOurPicksPlayersExtendedComponent,
    MatchdayTipsOurPicksDescriptionComponent,
    MatchdayTipsOurPicksFiltersComponent,
    MatchdayTipsOurPicksFilterTypesComponent,
    MatchdayTipsOurPicksDisplaySettingsComponent,
    MatchdayTipsOurPicksPlayersSimplifiedComponent,
    MatchdayTipsOurPicksComponent
  ],
  imports: [CommonModule, MatchdayTipsOurPicksRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    MatchdayTipsOurPicksLoadedGuard,
    MatchdayTipsOurPicksFiltersExecutor,
    MatchdayTipsOurPicksFiltersService,
    MatchdayTipsOurPicksDisplaySettingsService
  ]
})
export class OurPicksModule {}
