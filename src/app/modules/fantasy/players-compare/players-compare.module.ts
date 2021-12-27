import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersCompareRoutingModule } from './players-compare-routing.module';
import { PlayersCompareStateResolver } from './routing/players-compare-state.resolver';
import { PlayersCompareComponent } from './view/players-compare.component';
import { PlayersCompareTitleComponent } from './view/players-compare-title/players-compare-title.component';
import { PlayersCompareComparisonGeneralComponent } from './view/players-compare-comparison-general/players-compare-comparison-general.component';

@NgModule({
  declarations: [PlayersCompareComponent, PlayersCompareTitleComponent, PlayersCompareComparisonGeneralComponent],
  imports: [CommonModule, PlayersCompareRoutingModule, SharedModule, AngularMaterialModule],
  providers: [PlayersCompareStateResolver]
})
export class PlayersCompareModule {}
