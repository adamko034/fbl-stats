import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PositionSwitchModule } from 'src/app/common/components/filters/position-switch/position-switch.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersStatsPointsConverter } from './converters/players-stats-points.converter';
import { PlayersStatsPointsRoutingModule } from './players-stats-points-routing.module';
import { PlayersStatsPointsResolver } from './resolvers/players-stats-points.resolver';
import { PlayersStatsQueryParamsService } from './services/players-stats-query-params.service';
import { PlayersStatsPointsFiltersComponent } from './views/players-stats-points/players-stats-points-filters/players-stats-points-filters.component';
import { PlayersStatsPointsTableComponent } from './views/players-stats-points/players-stats-points-table/players-stats-points-table.component';
import { PlayersStatsPointsComponent } from './views/players-stats-points/players-stats-points.component';

@NgModule({
  declarations: [PlayersStatsPointsComponent, PlayersStatsPointsFiltersComponent, PlayersStatsPointsTableComponent],
  imports: [
    CommonModule,
    PlayersStatsPointsRoutingModule,
    SharedModule,
    FblCoreModule,
    AngularMaterialModule,
    PositionSwitchModule,
    PipesModule
  ],
  providers: [PlayersStatsQueryParamsService, PlayersStatsPointsResolver, PlayersStatsPointsConverter]
})
export class PlayersStatsPointsModule {}
