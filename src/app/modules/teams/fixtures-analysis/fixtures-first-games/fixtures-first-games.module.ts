import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SelectFutureMatchdaysPanelModule } from 'src/app/common/components/filters/select-future-matchdays-panel/select-future-matchdays-panel.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { LastKnownMatchdayModule } from 'src/app/common/routing/resolvers/last-known-matchday/last-known-matchday.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { NextUnlimitedTransfersModule } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesFirstGamesRoutingModule } from './fixtures-first-games-routing.module';
import { FixturesFirstGamesMatchdaysLoader } from './logic/fixtures-first-games-matchdays.loader';
import { FixturesFirstGamesTeamsLoader } from './logic/fixtures-first-games-teams.loader';
import { FixturesFirstGamesResolver } from './resolvers/fixtures-first-games.resolver';
import { FixturesFirstGamesFiltersService } from './services/fixtures-first-games-filters.service';
import { FixturesFirstGamesFiltersComponent } from './view/fixtures-first-games-filters/fixtures-first-games-filters.component';
import { FixturesFirstGamesMatchdaysComponent } from './view/fixtures-first-games-matchdays/fixtures-first-games-matchdays.component';
import { FixturesFirstGamesTeamsComponent } from './view/fixtures-first-games-teams/fixtures-first-games-teams.component';
import { FixturesFirstGamesComponent } from './view/fixtures-first-games.component';

@NgModule({
  declarations: [
    FixturesFirstGamesComponent,
    FixturesFirstGamesTeamsComponent,
    FixturesFirstGamesMatchdaysComponent,
    FixturesFirstGamesFiltersComponent
  ],
  imports: [
    CommonModule,
    CommonGuardsModule,
    FixturesFirstGamesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    SelectFutureMatchdaysPanelModule,
    NextUnlimitedTransfersModule,
    LastKnownMatchdayModule,
    LastMatchdayResolverModule,
    PipesModule,
    TeamLogoModule,
    AdBannerModule
  ],
  providers: [
    FixturesFirstGamesResolver,
    FixturesFirstGamesFiltersService,
    FixturesFirstGamesTeamsLoader,
    FixturesFirstGamesMatchdaysLoader
  ]
})
export class FixturesFirstGamesModule {}
