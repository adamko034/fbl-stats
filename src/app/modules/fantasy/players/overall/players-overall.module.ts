import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { MyTeamGuardsModule } from 'src/app/common/my-team/routing/guards/my-team-guards.module';
import { PlayersTableModule } from 'src/app/common/players/players-table/players-table.module';
import { PlayersServicesModule } from 'src/app/common/players/services/players-services.module';
import { PlayersResolverModule } from 'src/app/common/routing/resolvers/players-resolver/players-resolver.module';
import { PropertiesResolverModule } from 'src/app/common/routing/resolvers/properties-resolver/properties-resolver.module';
import { TeamsResolverModule } from 'src/app/common/routing/resolvers/teams/teams-resolver.module';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { PlayersOverallRoutingModule } from './players-overall-routing.module';
import { PlayersOverallContentComponent } from './views/players-overall-content.component';

@NgModule({
  declarations: [PlayersOverallContentComponent],
  imports: [
    CommonModule,
    PlayersOverallRoutingModule,
    PlayersTableModule,
    PlayersResolverModule,
    TeamsResolverModule,
    PropertiesResolverModule,
    PlayersServicesModule,
    MyTeamGuardsModule,
    AdBannerModule
  ],
  providers: [PlayersDataService]
})
export class PlayersModule {}
