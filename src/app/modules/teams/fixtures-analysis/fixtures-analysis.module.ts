import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesAnalysisRoutingModule } from './fixtures-analysis-routing.module';
import { FixturesAnalysisComponent } from './view/fixtures-analysis.component';

@NgModule({
  declarations: [FixturesAnalysisComponent],
  imports: [CommonModule, FixturesAnalysisRoutingModule, SharedModule]
})
export class FixturesAnalysisModule {}
