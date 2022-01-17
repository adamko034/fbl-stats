import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoldableValuesService } from '../../core/boldable-values/boldable-values.service';
import { FblCoreModule } from '../../core/fbl-core.module';
import { PlayersCompareRoutingModule } from './players-compare-routing.module';
import { PlayersCompareIdsCacheGuard } from './routing/players-compare-ids-cache.guard';
import { PlayersCompareStateResolver } from './routing/players-compare-state.resolver';
import { PlayersCompareFixturesService } from './services/players-compare-fixtures.service';
import { PlayersCompareIdsCacheService } from './services/players-compare-ids-store.service';
import { PlayersCompareNavigationService } from './services/players-compare-navigation.service';
import { PlayersCompareComparisonGeneralComponent } from './view/players-compare-comparison-general/players-compare-comparison-general.component';
import { PlayersCompareFixturesDetailsComponent } from './view/players-compare-fixtures/players-compare-fixtures-details/players-compare-fixtures-details.component';
import { PlayersCompareFixturesComponent } from './view/players-compare-fixtures/players-compare-fixtures.component';
import { PlayersCompareKickoffTimesComponent } from './view/players-compare-fixtures/players-compare-kickoff-times/players-compare-kickoff-times.component';
import { PlayersCompareTitleComponent } from './view/players-compare-title/players-compare-title.component';
import { PlayersCompareComponent } from './view/players-compare.component';

@NgModule({
  declarations: [
    PlayersCompareComponent,
    PlayersCompareTitleComponent,
    PlayersCompareComparisonGeneralComponent,
    PlayersCompareKickoffTimesComponent,
    PlayersCompareFixturesComponent,
    PlayersCompareFixturesDetailsComponent
  ],
  imports: [CommonModule, PlayersCompareRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [
    PlayersCompareStateResolver,
    PlayersCompareFixturesService,
    PlayersCompareNavigationService,
    PlayersCompareIdsCacheService,
    PlayersCompareIdsCacheGuard,
    BoldableValuesService
  ]
})
export class PlayersCompareModule {}
