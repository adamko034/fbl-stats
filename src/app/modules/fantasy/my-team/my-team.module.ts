import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularEmojisModule } from 'angular-emojis';
import { NgPipesModule } from 'ngx-pipes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { MyTeamRoutingModule } from './my-team-routing.module';
import { MyTeamPlayersFitlersService } from './services/my-team-players-filters.service';
import { MyTeamTilesDisplaySettingsService } from './services/my-team-tiles-display-settings.service';
import { MyTeamContentComponent } from './views/my-team-content/my-team-content.component';
import { MyTeamKickOffTimesComponent } from './views/my-team-content/my-team-kick-off-times/my-team-kick-off-times.component';
import { MyTeamOptionsComponent } from './views/my-team-content/my-team-selection/my-team-options/my-team-options.component';
import { MyTeamSelectionTileComponent } from './views/my-team-content/my-team-selection/my-team-selection-tile/my-team-selection-tile.component';
import { MyTeamSelectionComponent } from './views/my-team-content/my-team-selection/my-team-selection.component';
import { MyTeamTotalsComponent } from './views/my-team-content/my-team-selection/my-team-totals/my-team-totals.component';
import { MyTeamFiltersMatchdaysComponent } from './views/my-team-content/my-team-table-container/my-team-filters-matchdays/my-team-filters-matchdays.component';
import { MyTeamFiltersPositionComponent } from './views/my-team-content/my-team-table-container/my-team-filters-position/my-team-filters-position.component';
import { MyTeamTableContainerComponent } from './views/my-team-content/my-team-table-container/my-team-table-container.component';
import { MyTeamKickOffTimesMatchdayComponent } from './views/my-team-content/my-team-kick-off-times/my-team-kick-off-times-matchday/my-team-kick-off-times-matchday.component';

@NgModule({
  declarations: [
    MyTeamContentComponent,
    MyTeamSelectionComponent,
    MyTeamTableContainerComponent,
    MyTeamSelectionTileComponent,
    MyTeamOptionsComponent,
    MyTeamTotalsComponent,
    MyTeamFiltersMatchdaysComponent,
    MyTeamFiltersPositionComponent,
    MyTeamKickOffTimesComponent,
    MyTeamKickOffTimesMatchdayComponent
  ],
  imports: [
    CommonModule,
    MyTeamRoutingModule,
    NgPipesModule,
    SharedModule,
    AngularMaterialModule,
    FblCoreModule,
    AngularEmojisModule
  ],
  providers: [MyTeamTilesDisplaySettingsService, MyTeamPlayersFitlersService]
})
export class MyTeamModule {}
