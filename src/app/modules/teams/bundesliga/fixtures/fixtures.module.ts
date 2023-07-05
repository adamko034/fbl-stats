import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { FixtureDifficultyColorByRankModule } from 'src/app/common/directives/fixture-difficulty-color-by-rank/fixture-difficulty-color-by-rank.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { AssistsIconsModule } from 'src/app/common/players/components/assists-icons/assists-icons.module';
import { GoalsIconsModule } from 'src/app/common/players/components/goals-icons/goals-icons.module';
import { PlayerIconUnavailableModule } from 'src/app/common/players/components/player-icon-unavailable/player-icon-unavailable.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { PlayersPredictionsTableModule } from 'src/app/common/players/components/players-predictions-table/players-predictions-table.module';
import { PlayersServicesModule } from 'src/app/common/players/services/players-services.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { MatchdayFirstGameIconModule } from 'src/app/common/teams/components/matchday-first-game-icon/matchday-first-game-icon.module';
import { MatchdayStandaloneGameIconModule } from 'src/app/common/teams/components/matchday-standalone-game-icon/matchday-standalone-game-icon.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FixturesRoutingModule } from './fixtures-routing.module';
import { BundesligaFixtureDetailsResolver } from './resolvers/bundesliga-fixture-details.resolver';
import { BundesligaFixturesResolver } from './resolvers/bundesliga-fixtures.resolver';
import { BundesligaFixtureDetailsFantasyStatsComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-fantasy-stats/bundesliga-fixture-details-fantasy-stats.component';
import { BundesligaFixtureDetailsLast6GamesComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-last6-games/bundesliga-fixture-details-last6-games.component';
import { BundesligaFixtureDetailsLineupsComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-lineups/bundesliga-fixture-details-lineups.component';
import { BundesligaFixtureDetailsNextGamesComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-next-games/bundesliga-fixture-details-next-games.component';
import { BundesligaFixtureDetailsPlayersComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-players/bundesliga-fixture-details-players.component';
import { BundesligaFixtureDetailsPreviousRoundComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-previous-round/bundesliga-fixture-details-previous-round.component';
import { BundesligaFixtureDetailsStandingsComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-standings/bundesliga-fixture-details-standings.component';
import { BundesligaFixtureDetailsTitleComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details-title/bundesliga-fixture-details-title.component';
import { BundesligaFixtureDetailsComponent } from './views/bundesliga-fixture-details/bundesliga-fixture-details.component';
import { BundesligaFixturesComponent } from './views/bundesliga-fixtures/bundesliga-fixtures.component';

@NgModule({
  declarations: [
    BundesligaFixturesComponent,
    BundesligaFixtureDetailsComponent,
    BundesligaFixtureDetailsStandingsComponent,
    BundesligaFixtureDetailsTitleComponent,
    BundesligaFixtureDetailsLast6GamesComponent,
    BundesligaFixtureDetailsNextGamesComponent,
    BundesligaFixtureDetailsLineupsComponent,
    BundesligaFixtureDetailsPlayersComponent,
    BundesligaFixtureDetailsPreviousRoundComponent,
    BundesligaFixtureDetailsFantasyStatsComponent
  ],
  imports: [
    CommonModule,
    CommonGuardsModule,
    FixturesRoutingModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule,
    TeamLogoModule,
    AdBannerModule,
    MatchdayFirstGameIconModule,
    MatchdayStandaloneGameIconModule,
    FixtureDifficultyColorByRankModule,
    PlayersPredictionsTableModule,
    PlayersServicesModule,
    PlayerIconUnavailableModule,
    PlayerNameLinkModule,
    GoalsIconsModule,
    AssistsIconsModule,
    IfScreenModule
  ],
  providers: [BundesligaFixturesResolver, BundesligaFixtureDetailsResolver]
})
export class FixturesModule {}
