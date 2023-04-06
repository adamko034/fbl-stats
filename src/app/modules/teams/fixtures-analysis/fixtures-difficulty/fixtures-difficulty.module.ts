import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SelectFutureMatchdaysPanelModule } from 'src/app/common/components/filters/select-future-matchdays-panel/select-future-matchdays-panel.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { SwitcherModule } from 'src/app/common/components/ui/switcher/switcher.module';
import { HorizontalTopScrollbarModule } from 'src/app/common/directives/horizontal-top-scrollbar/horizontal-top-scrollbar.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { LastKnownMatchdayModule } from 'src/app/common/routing/resolvers/last-known-matchday/last-known-matchday.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { NextUnlimitedTransfersModule } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { MatchdayStandaloneGameIconModule } from 'src/app/common/teams/components/matchday-standalone-game-icon/matchday-standalone-game-icon.module';
import { TeamServicesModule } from 'src/app/common/teams/services/team-services.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesDifficultyRoutingModule } from './fixtures-difficulty-routing.module';
import { FixturesDifficultyTeamsLoaderFactory } from './logic/fixtures-difficulty-teams-loader-factory';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';

import { FixturesDifficultyFiltersService } from './services/fixtures-difficulty-filters.service';
import { FixturesDifficultyFiltersComponent } from './view/fixtures-difficulty-filters/fixtures-difficulty-filters.component';
import { FixturesDifficultyFixturesComponent } from './view/fixtures-difficulty-fixtures/fixtures-difficulty-fixtures.component';
import { FixturesDifficultyComponent } from './view/fixtures-difficulty.component';

@NgModule({
  declarations: [FixturesDifficultyFixturesComponent, FixturesDifficultyComponent, FixturesDifficultyFiltersComponent],
  imports: [
    CommonModule,
    FixturesDifficultyRoutingModule,
    SharedModule,
    AngularMaterialModule,
    SelectFutureMatchdaysPanelModule,
    LastMatchdayResolverModule,
    NextUnlimitedTransfersModule,
    LastKnownMatchdayModule,
    MatchdayFirstGameIconModule,
    MatchdayStandaloneGameIconModule,
    LegendModule,
    PipesModule,
    StickyModule,
    HorizontalTopScrollbarModule,
    TeamLogoModule,
    SwitcherModule,
    IfScreenModule,
    AdBannerModule,
    TeamServicesModule
  ],
  providers: [FixturesDifficultyResolver, FixturesDifficultyFiltersService, FixturesDifficultyTeamsLoaderFactory]
})
export class FixturesDifficultyModule {}
