import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { OurPicksDisplaySettingsComponent } from './components/our-picks-display-settings/our-picks-display-settings.component';
import { OurPicksFilterTypesComponent } from './components/our-picks-filter-types/our-picks-filter-types.component';
import { OurPicksFiltersComponent } from './components/our-picks-filters/our-picks-filters.component';
import { OurPicksPlayerExtendedComponent } from './components/our-picks-players/our-picks-players-extended/our-picks-player-extended/our-picks-player-extended.component';
import { OurPicksPlayersExtendedComponent } from './components/our-picks-players/our-picks-players-extended/our-picks-players-extended.component';
import { OurPicksPlayersSimplifiedComponent } from './components/our-picks-players/our-picks-players-simplified/our-picks-players-simplified.component';
import { OurPicksPlayersComponent } from './components/our-picks-players/our-picks-players.component';
import { OurPicksFiltersExecutor } from './filters/our-picks-filters-executor';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { OurPicksRoutingModule } from './our-picks-routing.module';
import { OurPicksDisplaySettingsService } from './services/our-picks-display-settings.service';
import { OurPicksFiltersService } from './services/our-picks-filters.service';
import { OurPicksMatchdayDescriptionComponent } from './views/our-picks-matchday/our-picks-matchday-description/our-picks-matchday-description.component';
import { OurPicksMatchdayComponent } from './views/our-picks-matchday/our-picks-matchday.component';

@NgModule({
  declarations: [
    OurPicksMatchdayComponent,
    OurPicksPlayersComponent,
    OurPicksPlayerExtendedComponent,
    OurPicksPlayersExtendedComponent,
    OurPicksMatchdayDescriptionComponent,
    OurPicksFiltersComponent,
    OurPicksFilterTypesComponent,
    OurPicksDisplaySettingsComponent,
    OurPicksPlayersSimplifiedComponent
  ],
  imports: [CommonModule, OurPicksRoutingModule, SharedModule, AngularMaterialModule, FblCoreModule],
  providers: [OurPicksLoadedGuard, OurPicksFiltersExecutor, OurPicksFiltersService, OurPicksDisplaySettingsService]
})
export class OurPicksModule {}
