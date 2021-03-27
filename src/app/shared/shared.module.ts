import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faCrown,
  faEquals,
  faExternalLinkAlt,
  faMedal,
  faPiggyBank,
  faQuestion,
  faSort,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSortAmountUp,
  faSortAmountUpAlt,
  faStar,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgPipesModule } from 'ngx-pipes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ExpansionPanelComponent } from 'src/app/shared/components/expansion-panel/expansion-panel.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';
import { FiltersContentLayoutComponent } from 'src/app/shared/components/layout/filters-content-layout/filters-content-layout.component';
import { PredictionIndicatorComponent } from 'src/app/shared/components/prediction-indicator/prediction-indicator.component';
import { SwitchComponent } from 'src/app/shared/components/switch/switch.component';
import { TeamFormComponent } from 'src/app/shared/components/team-form/team-form.component';
import { TeamLogoSourceDirective } from 'src/app/shared/components/team-logo/directives/team-logo-source.directive';
import { TeamLogoStyleDirective } from 'src/app/shared/components/team-logo/directives/team-logo-style.directive';
import { TeamLogoComponent } from 'src/app/shared/components/team-logo/team-logo.component';
import { TimelineComponent } from 'src/app/shared/components/timeline/timeline.component';
import { ToggleExpandComponent } from 'src/app/shared/components/toggle-expand/toggle-expand.component';
import { SumByPipe } from 'src/app/shared/pipes/sum-by.pipe';
import { ChartComponent } from './components/chart/chart.component';
import { FilterPositionComponent } from './components/filter-position/filter-position.component';
import { FiltersLayoutComponent } from './components/layout/filters-layout/filters-layout.component';
import { SubnavigationComponent } from './components/layout/subnavigation/subnavigation.component';
import { ViewLayoutComponent } from './components/layout/view-layout/view-layout.component';
import { ViewTitleComponent } from './components/layout/view-title/view-title.component';
import { MatchdayFirstGameIndicatorComponent } from './components/matchday-first-game-indicator/matchday-first-game-indicator.component';
import { MatchdayFixtureComponent } from './components/matchday/matchday-fixture/matchday-fixture.component';
import { MatchdayComponent } from './components/matchday/matchday.component';
import { MinMaxAvgComponent } from './components/min-max-avg/min-max-avg.component';
import { OurPickIconComponent } from './components/our-pick-icon/our-pick-icon.component';
import { PlayerNameLinkComponent } from './components/player-name-link/player-name-link.component';
import { SortByComponent } from './components/sorty-by/sort-by.component';
import { TextSubtextRowComponent } from './components/text-subtext-row/text-subtext-row.component';
import { TextValueCardComponent } from './components/text-value-card/text-value-card.component';
import { TimelineMatchdaysComponent } from './components/timeline-matchdays/timeline-matchdays.component';
import { TitleUnderlinedComponent } from './components/title-underlined/title-underlined.component';
import { AuthenticatedDirective } from './directives/authenticated.directive';
import { MedalColorDirective } from './directives/medal-color.directive';
import { EpochDatePipe } from './pipes/epoch-date.pipe';
import { FieldPipe } from './pipes/field.pipe';
import { NumeralsPipe } from './pipes/numerals.pipe';
import { WherePipe } from './pipes/where.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';

@NgModule({
  declarations: [
    TeamLogoComponent,
    TeamLogoSourceDirective,
    TeamLogoStyleDirective,
    SumByPipe,
    FormFieldComponent,
    PredictionIndicatorComponent,
    ToggleExpandComponent,
    TimelineComponent,
    TeamFormComponent,
    SwitchComponent,
    InputNumberComponent,
    WherePipe,
    NumeralsPipe,
    FiltersContentLayoutComponent,
    FiltersLayoutComponent,
    ExpansionPanelComponent,
    SubnavigationComponent,
    ViewLayoutComponent,
    ViewTitleComponent,
    SortByComponent,
    TitleUnderlinedComponent,
    MatchdayFixtureComponent,
    MatchdayComponent,
    MinMaxAvgComponent,
    TextValueCardComponent,
    FieldPipe,
    FilterPositionComponent,
    AuthenticatedDirective,
    OurPickIconComponent,
    YesNoPipe,
    MedalColorDirective,
    EpochDatePipe,
    TimelineMatchdaysComponent,
    PlayerNameLinkComponent,
    TextSubtextRowComponent,
    MatchdayFirstGameIndicatorComponent,
    ChartComponent
  ],
  imports: [CommonModule, AngularMaterialModule, FontAwesomeModule, RouterModule, NgPipesModule, NgxChartsModule],
  exports: [
    TeamLogoComponent,
    TeamLogoSourceDirective,
    TeamLogoStyleDirective,
    SumByPipe,
    FormFieldComponent,
    PredictionIndicatorComponent,
    ToggleExpandComponent,
    TimelineComponent,
    TeamFormComponent,
    SwitchComponent,
    InputNumberComponent,
    WherePipe,
    NumeralsPipe,
    FontAwesomeModule,
    FiltersContentLayoutComponent,
    FiltersLayoutComponent,
    ExpansionPanelComponent,
    SubnavigationComponent,
    ViewLayoutComponent,
    ViewTitleComponent,
    SortByComponent,
    NgPipesModule,
    TitleUnderlinedComponent,
    MatchdayComponent,
    MatchdayFixtureComponent,
    MinMaxAvgComponent,
    TextValueCardComponent,
    FieldPipe,
    FilterPositionComponent,
    AuthenticatedDirective,
    OurPickIconComponent,
    YesNoPipe,
    MedalColorDirective,
    EpochDatePipe,
    TimelineMatchdaysComponent,
    PlayerNameLinkComponent,
    TextSubtextRowComponent,
    MatchdayFirstGameIndicatorComponent,
    ChartComponent
  ]
})
export class SharedModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(
      faTwitter,
      faSort,
      faSortAmountDown,
      faSortAmountDownAlt,
      faSortAmountUp,
      faSortAmountUpAlt,
      faExternalLinkAlt,
      faArrowUp,
      faArrowDown,
      faEquals,
      faCrown,
      faPiggyBank,
      faStar,
      faUserPlus,
      faMedal,
      faQuestion
    );
  }
}
