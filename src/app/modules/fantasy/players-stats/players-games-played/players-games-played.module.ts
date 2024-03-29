import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PositionSwitchModule } from 'src/app/common/components/filters/position-switch/position-switch.module';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { FollowUsModule } from 'src/app/common/components/ui/follow-us/follow-us.module';
import { FormFieldModule } from 'src/app/common/components/ui/form-field/form-field.module';
import { SwitcherModule } from 'src/app/common/components/ui/switcher/switcher.module';
import { IfScreenModule } from 'src/app/common/directives/if-screen/if-screen.module';
import { CommonGuardsModule } from 'src/app/common/routing/guards/common-guards.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersGamesPlayedRoutingModule } from './players-games-played-routing.module';
import { PlayersGamesPlayedResolver } from './resolvers/players-games-played.resolver';
import { PlayersGamesPlayedComponent } from './views/players-games-played/players-games-played.component';

@NgModule({
  declarations: [PlayersGamesPlayedComponent],
  imports: [
    CommonModule,
    PlayersGamesPlayedRoutingModule,
    SharedModule,
    PositionSwitchModule,
    LastMatchdayResolverModule,
    FollowUsModule,
    SwitcherModule,
    FormFieldModule,
    AdBannerModule,
    IfScreenModule,
    CommonGuardsModule
  ],
  providers: [PlayersGamesPlayedResolver]
})
export class PlayersGamesPlayedModule {}
