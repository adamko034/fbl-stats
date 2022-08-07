import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SelectFutureMatchdaysPanelModule } from 'src/app/common/components/filters/select-future-matchdays-panel/select-future-matchdays-panel.module';
import { LegendModule } from 'src/app/common/components/ui/legend/legend.module';
import { LastKnownMatchdayModule } from 'src/app/common/routing/resolvers/last-known-matchday/last-known-matchday.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { NextUnlimitedTransfersModule } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { MatchdayStandaloneGameIconModule } from 'src/app/common/teams/components/matchday-standalone-game-icon/matchday-standalone-game-icon.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesDifficultyRoutingModule } from './fixtures-difficulty-routing.module';
import { FixturesDifficultyTeamsLoaderFactory } from './logic/fixtures-difficulty-teams-loader-factory';
import { FixturesDifficultyResolver } from './resolvers/fixtures-difficulty.resolver';
import { FixtureDifficultyColorsService } from './services/fixture-difficulty-colors.service';
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
    LegendModule
  ],
  providers: [
    FixtureDifficultyColorsService,
    FixturesDifficultyResolver,
    FixturesDifficultyFiltersService,
    FixturesDifficultyTeamsLoaderFactory
  ]
})
export class FixturesDifficultyModule {}
