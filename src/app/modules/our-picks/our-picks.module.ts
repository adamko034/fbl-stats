import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurPicksRoutingModule } from './our-picks-routing.module';
import { OurPicksContentComponent } from './our-picks-content/our-picks-content.component';
import { OurPicksMatchdayComponent } from './views/our-picks-matchday/our-picks-matchday.component';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { OurPicksPlayersComponent } from './components/our-picks-players/our-picks-players.component';
import { OurPicksPlayerComponent } from './components/our-picks-players/our-picks-player/our-picks-player.component';
import { OurPicksMatchdayDescriptionComponent } from './views/our-picks-matchday/our-picks-matchday-description/our-picks-matchday-description.component';
import { OurPicksFiltersComponent } from './components/our-picks-filters/our-picks-filters.component';
import { OurPicksFilterTypesComponent } from './components/our-picks-filter-types/our-picks-filter-types.component';
import { OurPicksFiltersService } from './services/our-picks-filters.service';
import { OurPicksAdminComponent } from './views/our-picks-admin/our-picks-admin.component';
import { OurPicksAdminSelectComponent } from './views/our-picks-admin/our-picks-admin-select/our-picks-admin-select.component';
import { OurPicksFiltersExecutor } from './services/our-picks-filters-executor';
import { OurPicksDisplaySettingsComponent } from './components/our-picks-display-settings/our-picks-display-settings.component';
import { OurPicksDisplaySettingsService } from './services/our-picks-display-settings.service';

@NgModule({
  declarations: [
    OurPicksContentComponent,
    OurPicksMatchdayComponent,
    OurPicksPlayersComponent,
    OurPicksPlayerComponent,
    OurPicksMatchdayDescriptionComponent,
    OurPicksFiltersComponent,
    OurPicksFilterTypesComponent,
    OurPicksAdminComponent,
    OurPicksAdminSelectComponent,
    OurPicksDisplaySettingsComponent
  ],
  imports: [CommonModule, OurPicksRoutingModule, SharedModule, AngularMaterialModule],
  providers: [OurPicksLoadedGuard, OurPicksFiltersExecutor, OurPicksFiltersService, OurPicksDisplaySettingsService]
})
export class OurPicksModule {}
