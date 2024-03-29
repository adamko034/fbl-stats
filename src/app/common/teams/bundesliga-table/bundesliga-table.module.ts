import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SelectLastMatchdaysModule } from '../../components/filters/select-last-matchdays/select-last-matchdays.module';
import { SelectMatchdaysPanelModule } from '../../components/filters/select-matchdays-panel/select-matchdays-panel.module';
import { VenueSwitchModule } from '../../components/filters/venue-switch/venue-switch.module';
import { CompareArrowModule } from '../../components/ui/compare-arrow/compare-arrow.module';
import { ContentTitledModule } from '../../components/ui/content-titled/content-titled.module';
import { ContentWhiteBlockModule } from '../../components/ui/content-white-block/content-white-block.module';
import { FormDottedModule } from '../../components/ui/form-dotted/form-dotted.module';
import { LegendModule } from '../../components/ui/legend/legend.module';
import { TitleModule } from '../../components/ui/title/title.module';
import { HorizontalTopScrollbarModule } from '../../directives/horizontal-top-scrollbar/horizontal-top-scrollbar.module';
import { ScaleModule } from '../../directives/scale/scale.module';
import { TeamLogoModule } from '../team-logo/team-logo.module';
import { BundesligaTableFiltersComponent } from './components/bundesliga-table-filters/bundesliga-table-filters.component';
import { BundesligaTableInnerComponent } from './components/bundesliga-table-inner/bundesliga-table-inner.component';
import { BundesligaTableComponent } from './components/bundesliga-table.component';
import { BundesligaTableResultsCalculator } from './services/bundsliga-table-results-calculator.service';

@NgModule({
  declarations: [BundesligaTableComponent, BundesligaTableFiltersComponent, BundesligaTableInnerComponent],
  imports: [
    CommonModule,
    VenueSwitchModule,
    SelectMatchdaysPanelModule,
    ContentTitledModule,
    MatSortModule,
    MatTableModule,
    ContentWhiteBlockModule,
    MatIconModule,
    ScaleModule,
    TeamLogoModule,
    LegendModule,
    FormDottedModule,
    TitleModule,
    CompareArrowModule,
    SelectLastMatchdaysModule,
    HorizontalTopScrollbarModule
  ],
  exports: [BundesligaTableComponent],
  providers: [BundesligaTableResultsCalculator]
})
export class BundesligaTableModule {}
