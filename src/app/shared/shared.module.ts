import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faBullseye,
  faCrown,
  faEquals,
  faExternalLinkAlt,
  faFutbol,
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
import { MomentModule } from 'ngx-moment';
import { NgPipesModule } from 'ngx-pipes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TeamFormComponent } from 'src/app/shared/components/team-form/team-form.component';
import { FormFieldModule } from '../common/components/ui/form-field/form-field.module';
import { ValueDifferenceModule } from '../common/components/ui/value-difference/value-difference.module';
import { ScaleModule } from '../common/directives/scale/scale.module';
import { StickyModule } from '../common/directives/sticky/sticky.module';
import { PipesModule } from '../common/pipes/pipes.module';
import { AssistsIconsModule } from '../common/players/components/assists-icons/assists-icons.module';
import { GoalsIconsModule } from '../common/players/components/goals-icons/goals-icons.module';
import { HasCameFromBenchIconModule } from '../common/players/components/has-came-from-bench-icon/has-came-from-bench-icon.module';
import { HasPlayedSeventyMinutesIconModule } from '../common/players/components/has-played-seventy-minutes-icon/has-played-seventy-minutes-icon.module';
import { HasStartedIconModule } from '../common/players/components/has-started-icon/has-started-icon.module';
import { PlayerNameLinkModule } from '../common/players/components/player-name-link/player-name-link.module';
import { MatchdayFirstGameIconModule } from '../common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { MatchdayStandaloneGameIconModule } from '../common/teams/components/matchday-standalone-game-icon/matchday-standalone-game-icon.module';
import { TeamLogoModule } from '../common/teams/team-logo/team-logo.module';
import { IconWrapperComponent } from './components/icon-wrapper/icon-wrapper.component';
import { IncludeFutureMatchdaysDropdownComponent } from './components/include-future-matchdays-dropdown/include-future-matchdays-dropdown.component';
import { IncludePastMatchdaysDropdownComponent } from './components/include-past-matchdays-dropdown/include-past-matchdays-dropdown.component';
import { SubnavigationComponent } from './components/layout/subnavigation/subnavigation.component';
import { ViewLayoutComponent } from './components/layout/view-layout/view-layout.component';
import { ViewTabsNavigationComponent } from './components/layout/view-tabs-navigation/view-tabs-navigation.component';
import { ViewTitleComponent } from './components/layout/view-title/view-title.component';
import { ViewComponent } from './components/layout/view/view.component';
import { WhiteBlockComponent } from './components/layout/white-block/white-block.component';
import { MinMaxAvgComponent } from './components/min-max-avg/min-max-avg.component';
import { PlayersListGenericComponent } from './components/players-list-generic/players-list-generic.component';
import { PostponedGameIconComponent } from './components/postponed-game-icon/postponed-game-icon.component';
import { SelectDialogDialogComponent } from './components/select-dialog/select-dialog-dialog/select-dialog-dialog.component';
import { SelectDialogComponent } from './components/select-dialog/select-dialog.component';
import { TeamGameAgainstComponent } from './components/team-game-against/team-game-against.component';
import { TeamLineupComponent } from './components/team-lineup/team-lineup.component';
import { TeamPlayersTableComponent } from './components/team-players-table/team-players-table.component';
import { TextSubtextRowComponent } from './components/text-subtext-row/text-subtext-row.component';
import { TextValueCardComponent } from './components/text-value-card/text-value-card.component';
import { TimelineMatchdaysComponent } from './components/timeline-matchdays/timeline-matchdays.component';
import { TitleUnderlinedGreyComponent } from './components/title-underlined-grey/title-underlined-grey.component';
import { TitleUnderlinedComponent } from './components/title-underlined/title-underlined.component';
import { MedalColorDirective } from './directives/medal-color.directive';
import { SizeDirective } from './directives/size.directive';

@NgModule({
  declarations: [
    TeamFormComponent,
    SubnavigationComponent,
    ViewLayoutComponent,
    ViewTitleComponent,
    TitleUnderlinedComponent,
    MinMaxAvgComponent,
    TextValueCardComponent,
    MedalColorDirective,
    TimelineMatchdaysComponent,
    TextSubtextRowComponent,
    TitleUnderlinedGreyComponent,
    ViewComponent,
    ViewTabsNavigationComponent,
    WhiteBlockComponent,
    PlayersListGenericComponent,
    TeamLineupComponent,
    SelectDialogComponent,
    SelectDialogDialogComponent,
    TeamGameAgainstComponent,
    TeamPlayersTableComponent,
    SizeDirective,
    IconWrapperComponent,
    IncludeFutureMatchdaysDropdownComponent,
    IncludePastMatchdaysDropdownComponent,
    PostponedGameIconComponent
  ],
  imports: [
    AssistsIconsModule,
    CommonModule,
    MomentModule,
    AngularMaterialModule,
    FontAwesomeModule,
    RouterModule,
    NgPipesModule,
    PipesModule,
    ScaleModule,
    StickyModule,
    PlayerNameLinkModule,
    TeamLogoModule,
    MatchdayFirstGameIconModule,
    MatchdayStandaloneGameIconModule,
    ValueDifferenceModule,
    FormFieldModule,
    GoalsIconsModule,
    HasCameFromBenchIconModule,
    HasPlayedSeventyMinutesIconModule,
    HasStartedIconModule
  ],
  exports: [
    TeamFormComponent,
    FontAwesomeModule,
    SubnavigationComponent,
    ViewLayoutComponent,
    ViewTitleComponent,
    NgPipesModule,
    TitleUnderlinedComponent,
    MinMaxAvgComponent,
    TextValueCardComponent,
    MedalColorDirective,
    TimelineMatchdaysComponent,
    TextSubtextRowComponent,
    TitleUnderlinedGreyComponent,
    ViewComponent,
    ViewTabsNavigationComponent,
    WhiteBlockComponent,
    PlayersListGenericComponent,
    TeamLineupComponent,
    SelectDialogComponent,
    TeamGameAgainstComponent,
    TeamPlayersTableComponent,
    SizeDirective,
    IconWrapperComponent,
    IncludeFutureMatchdaysDropdownComponent,
    IncludePastMatchdaysDropdownComponent,
    PostponedGameIconComponent
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
      faQuestion,
      faBullseye,
      faFutbol
    );
  }
}
