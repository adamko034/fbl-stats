import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
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
import { MomentModule } from 'ngx-moment';
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
import { BundesligaTableFiltersComponent } from './components/bundesliga-table/bundesliga-table-filters/bundesliga-table-filters.component';
import { BundesligaTableInnerComponent } from './components/bundesliga-table/bundesliga-table-inner/bundesliga-table-inner.component';
import { BundesligaTableComponent } from './components/bundesliga-table/bundesliga-table.component';
import { ChartDialogComponent } from './components/chart-dialog/chart-dialog.component';
import { ChartComponent } from './components/chart/chart.component';
import { FilterPositionComponent } from './components/filter-position/filter-position.component';
import { FollowUsToStayTunedComponent } from './components/follow-us-to-stay-tuned/follow-us-to-stay-tuned.component';
import { FiltersLayoutComponent } from './components/layout/filters-layout/filters-layout.component';
import { SubnavigationComponent } from './components/layout/subnavigation/subnavigation.component';
import { ViewLayoutComponent } from './components/layout/view-layout/view-layout.component';
import { ViewTabsNavigationComponent } from './components/layout/view-tabs-navigation/view-tabs-navigation.component';
import { ViewTitleComponent } from './components/layout/view-title/view-title.component';
import { ViewComponent } from './components/layout/view/view.component';
import { WhiteBlockComponent } from './components/layout/white-block/white-block.component';
import { MatchdayFirstGameIndicatorComponent } from './components/matchday-first-game-indicator/matchday-first-game-indicator.component';
import { MinMaxAvgComponent } from './components/min-max-avg/min-max-avg.component';
import { OurPickIconComponent } from './components/our-pick-icon/our-pick-icon.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PlayerNameLinkComponent } from './components/player-name-link/player-name-link.component';
import { PlayersListGenericComponent } from './components/players-list-generic/players-list-generic.component';
import { PlayersPositionSwitchComponent } from './components/players-position-switch/players-position-switch.component';
import { PlayersTableGenericComponent } from './components/players-table-generic/players-table-generic.component';
import { SelectTeamsModalComponent } from './components/select-teams/select-teams-modal/select-teams-modal.component';
import { SelectTeamsComponent } from './components/select-teams/select-teams.component';
import { ShowMoreLinkComponent } from './components/show-more-link/show-more-link.component';
import { SliderMaxPopularityComponent } from './components/slider-max-popularity/slider-max-popularity.component';
import { SliderMaxPriceComponent } from './components/slider-max-price/slider-max-price.component';
import { SortByComponent } from './components/sorty-by/sort-by.component';
import { TeamLineupComponent } from './components/team-lineup/team-lineup.component';
import { TextSubtextRowComponent } from './components/text-subtext-row/text-subtext-row.component';
import { TextValueCardComponent } from './components/text-value-card/text-value-card.component';
import { TimeAgoComponent } from './components/time-ago/time-ago.component';
import { TimelineMatchdaysComponent } from './components/timeline-matchdays/timeline-matchdays.component';
import { TitleUnderlinedGreyComponent } from './components/title-underlined-grey/title-underlined-grey.component';
import { TitleUnderlinedComponent } from './components/title-underlined/title-underlined.component';
import { ValueDifferenceComponent } from './components/value-difference/value-difference.component';
import { AuthenticatedDirective } from './directives/authenticated.directive';
import { MedalColorDirective } from './directives/medal-color.directive';
import { ScaleDirective } from './directives/scale.directive';
import { AveragePipe } from './pipes/average.pipe';
import { EpochDatePipe } from './pipes/epoch-date.pipe';
import { FieldPipe } from './pipes/field.pipe';
import { LengthPipe } from './pipes/length.pipe';
import { NumeralsPipe } from './pipes/numerals.pipe';
import { TakePipe } from './pipes/take.pipe';
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
    ChartComponent,
    TitleUnderlinedGreyComponent,
    AveragePipe,
    TakePipe,
    PlayersPositionSwitchComponent,
    LengthPipe,
    ShowMoreLinkComponent,
    ChartDialogComponent,
    ValueDifferenceComponent,
    ViewComponent,
    ViewTabsNavigationComponent,
    WhiteBlockComponent,
    PlayersListGenericComponent,
    ScaleDirective,
    SelectTeamsComponent,
    SelectTeamsModalComponent,
    SliderMaxPriceComponent,
    SliderMaxPopularityComponent,
    TeamLineupComponent,
    FollowUsToStayTunedComponent,
    BundesligaTableComponent,
    BundesligaTableFiltersComponent,
    BundesligaTableInnerComponent,
    PieChartComponent,
    TimeAgoComponent,
    PlayersTableGenericComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
    AngularMaterialModule,
    FontAwesomeModule,
    RouterModule,
    NgPipesModule,
    NgxChartsModule
  ],
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
    ChartComponent,
    TitleUnderlinedGreyComponent,
    AveragePipe,
    TakePipe,
    PlayersPositionSwitchComponent,
    LengthPipe,
    ShowMoreLinkComponent,
    ValueDifferenceComponent,
    ViewComponent,
    ViewTabsNavigationComponent,
    WhiteBlockComponent,
    PlayersListGenericComponent,
    ScaleDirective,
    SelectTeamsComponent,
    SliderMaxPopularityComponent,
    SliderMaxPriceComponent,
    TeamLineupComponent,
    FollowUsToStayTunedComponent,
    BundesligaTableComponent,
    PieChartComponent,
    TimeAgoComponent,
    PlayersTableGenericComponent
  ]
})
export class SharedModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(
      faTwitter,
      faFacebook,
      faFacebookF,
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
