import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgPipesModule } from 'ngx-pipes';
import { ValueDifferenceModule } from '../value-difference/value-difference.module';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent, ChartDialogComponent],
  imports: [CommonModule, NgxChartsModule, FontAwesomeModule, MatDialogModule, NgPipesModule, ValueDifferenceModule],
  exports: [ChartComponent]
})
export class ChartModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(faExternalLinkAlt);
  }
}
