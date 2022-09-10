import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MaxPopularitySliderModule } from 'src/app/common/components/filters/max-popularity-slider/max-popularity-slider.module';
import { MaxPriceSliderModule } from 'src/app/common/components/filters/max-price-slider/max-price-slider.module';
import { FollowUsModule } from 'src/app/common/components/ui/follow-us/follow-us.module';
import { SwitcherModule } from 'src/app/common/components/ui/switcher/switcher.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatchdayTipsTopTeamRoutingModule } from './matchday-tips-top-team-routing.module';
import { MatchdayTipsTopTeamElector } from './routing/matchday-tips-top-team-elector.service';
import { MatchdayTipsTopTeamExtractorFactory } from './routing/matchday-tips-top-team-extractor-factory';
import { MatchdayTipsTopTeamSelector } from './routing/matchday-tips-top-team-selector.service';
import { MatchdayTipsTopTeamResolver } from './routing/matchday-tips-top-team.resolver';
import { MatchdayTipsTopTeamFiltersComponent } from './views/matchday-tips-top-team-filters/matchday-tips-top-team-filters.component';
import { MatchdayTipsTopTeamComponent } from './views/matchday-tips-top-team.component';

@NgModule({
  declarations: [MatchdayTipsTopTeamComponent, MatchdayTipsTopTeamFiltersComponent],
  imports: [
    CommonModule,
    MatchdayTipsTopTeamRoutingModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule,
    FollowUsModule,
    MaxPopularitySliderModule,
    MaxPriceSliderModule,
    SwitcherModule
  ],
  providers: [
    MatchdayTipsTopTeamResolver,
    MatchdayTipsTopTeamSelector,
    MatchdayTipsTopTeamElector,
    MatchdayTipsTopTeamExtractorFactory
  ]
})
export class MatchdayTipsTopTeamModule {}
