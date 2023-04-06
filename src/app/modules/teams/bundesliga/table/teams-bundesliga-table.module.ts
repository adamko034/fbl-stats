import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdBannerModule } from 'src/app/common/components/ui/ad-banner/ad-banner.module';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { TeamsResolverModule } from 'src/app/common/routing/resolvers/teams/teams-resolver.module';
import { BundesligaTableModule } from 'src/app/common/teams/bundesliga-table/bundesliga-table.module';
import { TeamsBundesligaTableTeamsConverter } from './converters/teams-bundesliga-table-teams.converter';
import { SelectedTeamsResolver } from './resolvers/selected-teams.resolver';
import { TeamsBundesligaTableRoutingModule } from './teams-bundesliga-table-routing.module';
import { TeamsBundesligaTableComponent } from './view/teams-bundesliga-table.component';

@NgModule({
  declarations: [TeamsBundesligaTableComponent],
  imports: [
    CommonModule,
    TeamsBundesligaTableRoutingModule,
    BundesligaTableModule,
    LastMatchdayResolverModule,
    TeamsResolverModule,
    AdBannerModule
  ],
  providers: [TeamsBundesligaTableTeamsConverter, SelectedTeamsResolver]
})
export class TeamsBundesligaTableModule {}
