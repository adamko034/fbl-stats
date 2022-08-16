import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { OurPickIconModule } from 'src/app/common/players/components/our-pick-icon/our-pick-icon.module';
import { PlayerIconPredictionModule } from 'src/app/common/players/components/player-icon-prediction/player-icon-prediction.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { GameTeamVenueModule } from 'src/app/common/teams/components/game-team-venue/game-team-venue.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../core/fbl-core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoggedGuard } from './guard/admin-logged.guard';
import { AdminMatchdayTipsLinksService } from './matchday-tips/links/services/admin-matchday-tips-links.service';
import { AdminMatchdayTipsLinksComponent } from './matchday-tips/links/views/admin-matchday-tips-links/admin-matchday-tips-links.component';
import { AdminMatchdayTipsNewLinkComponent } from './matchday-tips/links/views/admin-matchday-tips-links/admin-matchday-tips-new-link/admin-matchday-tips-new-link.component';
import { AdminMatchdayTipsOurPicksLoadedGuard } from './matchday-tips/our-picks/guards/admin-matchday-tips-our-picks-loaded.guard';
import { AdminMatchdayTipsOurPicksLoader } from './matchday-tips/our-picks/loaders/admin-matchday-tips-our-picks.loader';
import { AdminMatchdayTipsOurPicksResolver } from './matchday-tips/our-picks/resolvers/admin-matchday-tips-our-picks.resolver';
import { AdminMatchdayTipsOurPicksPlayerSearchComponent } from './matchday-tips/our-picks/views/admin-matchday-tips-our-picks/admin-matchday-tips-our-picks-player-search/admin-matchday-tips-our-picks-player-search.component';
import { AdminMatchdayTipsOurPicksTotalsComponent } from './matchday-tips/our-picks/views/admin-matchday-tips-our-picks/admin-matchday-tips-our-picks-totals/admin-matchday-tips-our-picks-totals.component';
import { AdminMatchdayTipsOurPicksComponent } from './matchday-tips/our-picks/views/admin-matchday-tips-our-picks/admin-matchday-tips-our-picks.component';
import { LinkPreviewService } from './services/link-preview.service';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { AdminComponent } from './views/admin/admin.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminComponent,
    AdminMatchdayTipsOurPicksComponent,
    AdminMatchdayTipsOurPicksTotalsComponent,
    AdminMatchdayTipsOurPicksPlayerSearchComponent,
    AdminMatchdayTipsLinksComponent,
    AdminMatchdayTipsNewLinkComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FblCoreModule,
    PlayerIconPredictionModule,
    PipesModule,
    NgPipesModule,
    PlayerNameLinkModule,
    TeamLogoModule,
    MatchdayFirstGameIconModule,
    OurPickIconModule,
    SharedModule,
    AngularMaterialModule,
    GameTeamVenueModule
  ],
  providers: [
    AdminLoggedGuard,
    AdminMatchdayTipsOurPicksLoadedGuard,
    AdminMatchdayTipsOurPicksResolver,
    AdminMatchdayTipsOurPicksLoader,
    AdminMatchdayTipsLinksService,
    LinkPreviewService
  ]
})
export class AdminModule {}
