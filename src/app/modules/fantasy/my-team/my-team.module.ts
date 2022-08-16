import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularEmojisModule } from 'angular-emojis';
import { NgPipesModule } from 'ngx-pipes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { StickyModule } from 'src/app/common/directives/sticky/sticky.module';
import { MyTeamGuardsModule } from 'src/app/common/my-team/routing/guards/my-team-guards.module';
import { MyTeamResolversModule } from 'src/app/common/my-team/routing/resolvers/my-team-resolvers.module';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { PlayerNameLinkModule } from 'src/app/common/players/components/player-name-link/player-name-link.module';
import { PlayersTableModule } from 'src/app/common/players/players-table/players-table.module';
import { PropertiesResolverModule } from 'src/app/common/routing/resolvers/properties-resolver/properties-resolver.module';
import { TeamsResolverModule } from 'src/app/common/routing/resolvers/teams/teams-resolver.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FblCoreModule } from '../../core/fbl-core.module';
import { MyTeamRoutingModule } from './my-team-routing.module';
import { MyTeamTilesDisplaySettingsService } from './services/my-team-tiles-display-settings.service';
import { MyTeamContentComponent } from './views/my-team-content.component';
import { MyTeamKickOffTimesMatchdayComponent } from './views/my-team-kick-off-times/my-team-kick-off-times-matchday/my-team-kick-off-times-matchday.component';
import { MyTeamKickOffTimesComponent } from './views/my-team-kick-off-times/my-team-kick-off-times.component';
import { MyTeamOptionsComponent } from './views/my-team-selection/my-team-options/my-team-options.component';
import { MyTeamSelectionTileComponent } from './views/my-team-selection/my-team-selection-tile/my-team-selection-tile.component';
import { MyTeamSelectionComponent } from './views/my-team-selection/my-team-selection.component';
import { MyTeamTotalsComponent } from './views/my-team-selection/my-team-totals/my-team-totals.component';

@NgModule({
  declarations: [
    MyTeamContentComponent,
    MyTeamSelectionComponent,
    MyTeamSelectionTileComponent,
    MyTeamOptionsComponent,
    MyTeamTotalsComponent,
    MyTeamKickOffTimesComponent,
    MyTeamKickOffTimesMatchdayComponent
  ],
  imports: [
    CommonModule,
    MyTeamRoutingModule,
    PlayersTableModule,
    TeamsResolverModule,
    PropertiesResolverModule,
    MyTeamResolversModule,
    MyTeamGuardsModule,
    NgPipesModule,
    SharedModule,
    AngularMaterialModule,
    AngularEmojisModule,
    FblCoreModule,
    PipesModule,
    StickyModule,
    PlayerNameLinkModule,
    TeamLogoModule
  ],
  providers: [MyTeamTilesDisplaySettingsService]
})
export class MyTeamModule {}
