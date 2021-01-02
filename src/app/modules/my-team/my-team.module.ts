import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { MyTeamPlayersFitlersService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-players-filters.service';
import { MyTeamTilesDisplaySettingsService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-tiles-display-settings.service';
import { MyTeamRoutingModule } from 'src/app/modules/my-team/my-team-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyTeamOptionsComponent } from './layout/my-team-content/components/my-team-selection/components/my-team-options/my-team-options.component';
import { MyTeamPlayerSearchComponent } from './layout/my-team-content/components/my-team-selection/components/my-team-player-search/my-team-player-search.component';
import { MyTeamSelectionTileComponent } from './layout/my-team-content/components/my-team-selection/components/my-team-selection-tile/my-team-selection-tile.component';
import { MyTeamTotalsComponent } from './layout/my-team-content/components/my-team-selection/components/my-team-totals/my-team-totals.component';
import { MyTeamSelectionComponent } from './layout/my-team-content/components/my-team-selection/my-team-selection.component';
import { MyTeamFiltersMatchdaysComponent } from './layout/my-team-content/components/my-team-table-container/components/my-team-filters-matchdays/my-team-filters-matchdays.component';
import { MyTeamFiltersPositionComponent } from './layout/my-team-content/components/my-team-table-container/components/my-team-filters-position/my-team-filters-position.component';
import { MyTeamTableContainerComponent } from './layout/my-team-content/components/my-team-table-container/my-team-table-container.component';
import { MyTeamContentComponent } from './layout/my-team-content/my-team-content.component';

@NgModule({
  declarations: [
    MyTeamContentComponent,
    MyTeamSelectionComponent,
    MyTeamTableContainerComponent,
    MyTeamSelectionTileComponent,
    MyTeamPlayerSearchComponent,
    MyTeamOptionsComponent,
    MyTeamTotalsComponent,
    MyTeamFiltersMatchdaysComponent,
    MyTeamFiltersPositionComponent
  ],
  imports: [
    CommonModule,
    MyTeamRoutingModule,
    NgPipesModule,
    SharedModule,
    AngularMaterialModule,
    FblCoreModule,
    CommonModule
  ],
  providers: [MyTeamTilesDisplaySettingsService, MyTeamPlayersFitlersService]
})
export class MyTeamModule {}
