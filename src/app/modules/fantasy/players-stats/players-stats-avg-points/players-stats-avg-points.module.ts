import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PositionSwitchModule } from 'src/app/common/components/filters/position-switch/position-switch.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { FollowUsModule } from 'src/app/common/components/ui/follow-us/follow-us.module';
import { FormFieldModule } from 'src/app/common/components/ui/form-field/form-field.module';
import { SwitcherModule } from 'src/app/common/components/ui/switcher/switcher.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersStatsAvgPointsConverter } from './converters/players-stats-avg-points.converter';
import { PlayersStatsAvgPointsRoutingModule } from './players-stats-avg-points-routing.module';
import { PlayersStatsAvgPointsResolver } from './resolvers/players-stats-avg-points.resolver';
import { PlayersStatsAvgPointsQueryParamsService } from './services/players-stats-avg-points-query-params.service';
import { PlayersStatsAvgPointsFiltersComponent } from './views/players-stats-avg-points/players-stats-avg-points-filters/players-stats-avg-points-filters.component';
import { PlayersStatsAvgPointsComponent } from './views/players-stats-avg-points/players-stats-avg-points.component';

@NgModule({
  declarations: [PlayersStatsAvgPointsComponent, PlayersStatsAvgPointsFiltersComponent],
  imports: [
    CommonModule,
    PlayersStatsAvgPointsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    LastMatchdayResolverModule,
    PipesModule,
    PositionSwitchModule,
    SwitcherModule,
    FormFieldModule,
    FollowUsModule,
    AdBannerModule,
    IfScreenModule
  ],
  providers: [PlayersStatsAvgPointsQueryParamsService, PlayersStatsAvgPointsResolver, PlayersStatsAvgPointsConverter]
})
export class PlayersStatsAvgPointsModule {}
