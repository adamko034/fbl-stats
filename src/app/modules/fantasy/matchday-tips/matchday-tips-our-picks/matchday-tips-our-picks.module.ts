import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentWhiteBlockModule } from 'src/app/common/components/ui/content-white-block/content-white-block.module';
import { FollowUsModule } from 'src/app/common/components/ui/follow-us/follow-us.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { OurPickIconModule } from 'src/app/common/players/components/our-pick-icon/our-pick-icon.module';
import { PlayerIconPredictionModule } from 'src/app/common/players/components/player-icon-prediction/player-icon-prediction.module';
import { PlayerNameWithAvailabilityModule } from 'src/app/common/players/components/player-name-with-availability/player-name-with-availability.module';
import { GameTeamVenueModule } from 'src/app/common/teams/components/game-team-venue/game-team-venue.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { MatchdayTipsOurPicksLoadedGuard } from './guards/matchday-tips-our-picks-loaded.guard';
import { MatchdayTipsOurPicksRoutingModule } from './matchday-tips-our-picks-routing.module';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks.component';
import { MatchdayTipsOurPicksDescriptionComponent } from './views/our-picks-description/matchday-tips-our-picks-description.component';
import { MatchdayTipsOurPicksPlayersComponent } from './views/our-picks-players/matchday-tips-our-picks-players.component';

@NgModule({
  declarations: [
    MatchdayTipsOurPicksPlayersComponent,
    MatchdayTipsOurPicksDescriptionComponent,
    MatchdayTipsOurPicksComponent
  ],
  imports: [
    CommonModule,
    MatchdayTipsOurPicksRoutingModule,
    FlexLayoutModule,
    ContentWhiteBlockModule,
    GameTeamVenueModule,
    PlayerIconPredictionModule,
    PlayerNameWithAvailabilityModule,
    MatchdayFirstGameIconModule,
    PipesModule,
    TeamLogoModule,
    StickyModule,
    OurPickIconModule,
    FollowUsModule
  ],
  providers: [MatchdayTipsOurPicksLoadedGuard]
})
export class OurPicksModule {}
