import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectFutureMatchdaysModule } from '../../components/filters/select-future-matchdays/select-future-matchdays.module';
import { TeamsSelectModule } from '../../components/filters/teams-select/teams-select.module';
import { ContentTitledModule } from '../../components/ui/content-titled/content-titled.module';
import { ContentWhiteBlockModule } from '../../components/ui/content-white-block/content-white-block.module';
import { MatrixTableModule } from '../../components/ui/matrix-table/matrix-table.module';
import { StickyModule } from '../../directives/sticky/sticky.module';
import { TeamsKickoffTimesFiltersComponent } from './components/teams-kickoff-times-filters/teams-kickoff-times-filters.component';
import { TeamsKickoffTimesComponent } from './components/teams-kickoff-times.component';
import { TeamsKickoffTimesFiltersService } from './services/teams-kickoff-times-filters.service';
import { TeamsKickoffTimesMatrixTableRowsFabric } from './services/teams-kickoff-times-matrix-table-rows.fabric';
import { TeamsKickoffTimesService } from './services/teams-kickoff-times.service';

@NgModule({
  declarations: [TeamsKickoffTimesComponent, TeamsKickoffTimesFiltersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SelectFutureMatchdaysModule,
    ContentWhiteBlockModule,
    MatrixTableModule,
    TeamsSelectModule,
    StickyModule,
    ContentTitledModule
  ],
  providers: [TeamsKickoffTimesFiltersService, TeamsKickoffTimesMatrixTableRowsFabric, TeamsKickoffTimesService],
  exports: [TeamsKickoffTimesComponent]
})
export class TeamsDifferentKickoffTimesModule {}
