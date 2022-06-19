import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LastMatchdayResolverModule } from 'src/app/common/routing/resolvers/last-matchday/last-matchday-resolver.module';
import { TeamsResolverModule } from 'src/app/common/routing/resolvers/teams/teams-resolver.module';
import { BundesligaTableModule } from 'src/app/common/teams/bundesliga-table/bundesliga-table.module';
import { TeamsBundesligaTableTeamsConverter } from './converters/teams-bundesliga-table-teams.converter';
import { TeamsBundesligaTableRoutingModule } from './teams-bundesliga-table-routing.module';
import { TeamsBundesligaTableComponent } from './view/teams-bundesliga-table.component';

@NgModule({
  declarations: [TeamsBundesligaTableComponent],
  imports: [
    CommonModule,
    TeamsBundesligaTableRoutingModule,
    BundesligaTableModule,
    LastMatchdayResolverModule,
    TeamsResolverModule
  ],
  providers: [TeamsBundesligaTableTeamsConverter]
})
export class TeamsBundesligaTableModule {}
