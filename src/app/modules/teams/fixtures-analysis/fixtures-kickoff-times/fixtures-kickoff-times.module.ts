import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesKickoffTimesRoutingModule } from './fixtures-kickoff-times-routing.module';
import { FixturesKickoffTimesResolver } from './routing/fixtures-kickoff-times.resolver';
import { FixturesKickoffTimesFiltersService } from './services/fixtures-kickoff-times-filters.service';
import { FixturesKickoffTimesFiltersComponent } from './view/fixtures-kickoff-times-filters/fixtures-kickoff-times-filters.component';
import { FixturesKickoffTimesComponent } from './view/fixtures-kickoff-times.component';

@NgModule({
  declarations: [FixturesKickoffTimesComponent, FixturesKickoffTimesFiltersComponent],
  imports: [CommonModule, FixturesKickoffTimesRoutingModule, SharedModule],
  providers: [FixturesKickoffTimesFiltersService, FixturesKickoffTimesResolver]
})
export class FixturesKickoffTimesModule {}
