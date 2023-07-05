import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { ContentWhiteBlockModule } from 'src/app/common/components/ui/content-white-block/content-white-block.module';
import { FollowUsModule } from 'src/app/common/components/ui/follow-us/follow-us.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { TitleModule } from 'src/app/common/components/ui/title/title.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { OurPickIconModule } from 'src/app/common/players/components/our-pick-icon/our-pick-icon.module';
import { PlayerIconPredictionModule } from 'src/app/common/players/components/player-icon-prediction/player-icon-prediction.module';
import { PlayerNameWithAvailabilityModule } from 'src/app/common/players/components/player-name-with-availability/player-name-with-availability.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { GameTeamVenueModule } from 'src/app/common/teams/components/game-team-venue/game-team-venue.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { MatchdayTipsOurPicksLoadedGuard } from './guards/matchday-tips-our-picks-loaded.guard';
import { MatchdayTipsOurPicksRoutingModule } from './matchday-tips-our-picks-routing.module';
import { MatchdayTipsOurPicksComponent } from './views/matchday-tips-our-picks.component';
import { MatchdayTipsOurPicksPlayersComponent } from './views/our-picks-players/matchday-tips-our-picks-players.component';

@NgModule({
  declarations: [MatchdayTipsOurPicksPlayersComponent, MatchdayTipsOurPicksComponent],
  imports: [
    CommonModule,
    MatchdayTipsOurPicksRoutingModule,
    ContentWhiteBlockModule,
    GameTeamVenueModule,
    PlayerIconPredictionModule,
    PlayerNameWithAvailabilityModule,
    MatchdayFirstGameIconModule,
    PipesModule,
    TeamLogoModule,
    StickyModule,
    OurPickIconModule,
    FollowUsModule,
    LegendModule,
    TitleModule,
    LastMatchdayResolverModule,
    AdBannerModule,
    IfScreenModule,
    CommonGuardsModule
  ],
  providers: [MatchdayTipsOurPicksLoadedGuard]
})
export class OurPicksModule {}
