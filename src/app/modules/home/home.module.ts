import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { NgPipesModule } from 'ngx-pipes';
import { CardModule } from 'src/app/common/components/ui/card/card.module';
import { CompareArrowModule } from 'src/app/common/components/ui/compare-arrow/compare-arrow.module';
import { SwitcherModule } from 'src/app/common/components/ui/switcher/switcher.module';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { PlayerIconLineupPredictionModule } from 'src/app/common/players/components/player-icon-lineup-prediction/player-icon-lineup-prediction.module';
import { PlayerIconPredictionModule } from 'src/app/common/players/components/player-icon-prediction/player-icon-prediction.module';
import { PlayerIconReturningModule } from 'src/app/common/players/components/player-icon-returning/player-icon-returning.module';
import { PlayerIconSuspensionRiskModule } from 'src/app/common/players/components/player-icon-suspension-risk/player-icon-suspension-risk.module';
import { PlayerIconUnavailableModule } from 'src/app/common/players/components/player-icon-unavailable/player-icon-unavailable.module';
import { PlayerNameWithAvailabilityModule } from 'src/app/common/players/components/player-name-with-availability/player-name-with-availability.module';
import { PlayersTableCardModule } from 'src/app/common/players/components/players-table-card/players-table-card.module';
import { PlayersServicesModule } from 'src/app/common/players/services/players-services.module';
import { BundesligaNextFixtureResolverModule } from 'src/app/common/routing/resolvers/bundesliga-next-fixture/bundesliga-next-fixture-resolver.module';
import { PlayersResolverModule } from 'src/app/common/routing/resolvers/players-resolver/players-resolver.module';
import { PropertiesResolverModule } from 'src/app/common/routing/resolvers/properties-resolver/properties-resolver.module';
import { TeamsResolverModule } from 'src/app/common/routing/resolvers/teams/teams-resolver.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeBundesligaFixturesComponent } from './view/home-bundesliga/home-bundesliga-fixtures/home-bundesliga-fixtures.component';
import { HomeBundesligaTableComponent } from './view/home-bundesliga/home-bundesliga-table/home-bundesliga-table.component';
import { HomeBundesligaComponent } from './view/home-bundesliga/home-bundesliga.component';
import { HomePlayersGamesStartedComponent } from './view/home-players-games-started/home-players-games-started.component';
import { HomePlayersGoalsAssistsComponent } from './view/home-players-goals-assists/home-players-goals-assists.component';
import { HomePlayersPassesShotsDuelsComponent } from './view/home-players-passes-shots-duels/home-players-passes-shots-duels.component';
import { HomePlayersVariedPredictionsComponent } from './view/home-players-varied-predictions/home-players-varied-predictions.component';
import { HomePlayersWatchoutComponent } from './view/home-players-watchout/home-players-watchout.component';
import { HomePopularPlayersTop100Component } from './view/home-popular-players-top100/home-popular-players-top100.component';
import { HomePopularPlayersTop500Component } from './view/home-popular-players-top500/home-popular-players-top500.component';
import { HomeTitleComponent } from './view/home-title/home-title.component';
import { HomeTopPlayersAwayComponent } from './view/home-top-players-away/home-top-players-away.component';
import { HomeTopPlayersEfficiency10Component } from './view/home-top-players-efficiency10/home-top-players-efficiency10.component';
import { HomeTopPlayersHomeComponent } from './view/home-top-players-home/home-top-players-home.component';
import { HomeTopPlayersLast4Component } from './view/home-top-players-last4/home-top-players-last4.component';
import { HomeTopPlayersComponent } from './view/home-top-players/home-top-players.component';
import { HomeComponent } from './view/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeTopPlayersComponent,
    HomePopularPlayersTop500Component,
    HomePopularPlayersTop100Component,
    HomeTopPlayersLast4Component,
    HomeTitleComponent,
    HomePlayersWatchoutComponent,
    HomeBundesligaComponent,
    HomeBundesligaTableComponent,
    HomeBundesligaFixturesComponent,
    HomeTopPlayersAwayComponent,
    HomeTopPlayersHomeComponent,
    HomeTopPlayersEfficiency10Component,
    HomePlayersGoalsAssistsComponent,
    HomePlayersPassesShotsDuelsComponent,
    HomePlayersGamesStartedComponent,
    HomePlayersVariedPredictionsComponent
  ],
  imports: [
    CommonModule,
    NgPipesModule,
    HomeRoutingModule,
    PlayersTableCardModule,
    PlayersResolverModule,
    PropertiesResolverModule,
    FlexLayoutModule,
    PlayersServicesModule,
    SwitcherModule,
    CardModule,
    PipesModule,
    MatIconModule,
    PlayerIconUnavailableModule,
    PlayerIconReturningModule,
    PlayerIconSuspensionRiskModule,
    PlayerNameWithAvailabilityModule,
    BundesligaNextFixtureResolverModule,
    TeamsResolverModule,
    CompareArrowModule,
    TeamLogoModule,
    ScaleModule,
    PlayerIconPredictionModule,
    PlayerIconLineupPredictionModule
  ]
})
export class HomeModule {}
