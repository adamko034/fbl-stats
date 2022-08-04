import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentTitledModule } from 'src/app/common/components/ui/content-titled/content-titled.module';
import { ContentWhiteBlockModule } from 'src/app/common/components/ui/content-white-block/content-white-block.module';
import { PlayerIconPredictionModule } from 'src/app/common/players/components/player-icon-prediction/player-icon-prediction.module';
import { PlayerNameWithAvailabilityModule } from 'src/app/common/players/components/player-name-with-availability/player-name-with-availability.module';
import { GameTeamVenueModule } from 'src/app/common/teams/components/game-team-venue/game-team-venue.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsOurPicksFiltersExecutor } from './filters/matchday-tips-our-picks-filters-executor';
import { MatchdayTipsOurPicksLoadedGuard } from './guards/matchday-tips-our-picks-loaded.guard';
import { MatchdayTipsOurPicksRoutingModule } from './matchday-tips-our-picks-routing.module';
import { MatchdayTipsOurPicksDisplaySettingsService } from './services/matchday-tips-our-picks-display-settings.service';
import { MatchdayTipsOurPicksFiltersService } from './services/matchday-tips-our-picks-filters.service';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks/matchday-tips-our-picks.component';
import { MatchdayTipsOurPicksDescriptionComponent } from './views/matchday-tips-our-picks/our-picks-description/matchday-tips-our-picks-description.component';
import { MatchdayTipsOurPicksFilterTypesComponent } from './views/matchday-tips-our-picks/our-picks-filter-types/matchday-tips-our-picks-filter-types.component';
import { MatchdayTipsOurPicksFiltersComponent } from './views/matchday-tips-our-picks/our-picks-filters/matchday-tips-our-picks-filters.component';
import { MatchdayTipsOurPicksPlayersComponent } from './views/matchday-tips-our-picks/our-picks-players/matchday-tips-our-picks-players.component';
import { OurPicksPlayersTableComponent } from './views/matchday-tips-our-picks/our-picks-players/our-picks-players-table/our-picks-players-table.component';

@NgModule({
  declarations: [
    MatchdayTipsOurPicksPlayersComponent,
    MatchdayTipsOurPicksDescriptionComponent,
    MatchdayTipsOurPicksFiltersComponent,
    MatchdayTipsOurPicksFilterTypesComponent,
    MatchdayTipsOurPicksComponent,
    OurPicksPlayersTableComponent
  ],
  imports: [
    CommonModule,
    MatchdayTipsOurPicksRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ContentWhiteBlockModule,
    ContentTitledModule,
    GameTeamVenueModule,
    PlayerIconPredictionModule,
    PlayerNameWithAvailabilityModule,
    MatchdayFirstGameIconModule
  ],
  providers: [
    MatchdayTipsOurPicksLoadedGuard,
    MatchdayTipsOurPicksFiltersExecutor,
    MatchdayTipsOurPicksFiltersService,
    MatchdayTipsOurPicksDisplaySettingsService
  ]
})
export class OurPicksModule {}
