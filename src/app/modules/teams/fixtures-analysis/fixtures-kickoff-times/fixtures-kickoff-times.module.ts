import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NextUnlimitedTransfersModule } from 'src/app/common/routing/resolvers/next-unlimited-transfers/next-unlimited-transfers.module';
import { PropertiesResolverModule } from 'src/app/common/routing/resolvers/properties-resolver/properties-resolver.module';
import { TeamsResolverModule } from 'src/app/common/routing/resolvers/teams/teams-resolver.module';
import { TeamsDifferentKickoffTimesModule } from 'src/app/common/teams/teams-kickoff-times/teams-kickoff-times.module';
import { FixturesKickoffTimesRoutingModule } from './fixtures-kickoff-times-routing.module';
import { FixturesKickoffTimesComponent } from './view/fixtures-kickoff-times.component';

@NgModule({
  declarations: [FixturesKickoffTimesComponent],
  imports: [
    CommonModule,
    FixturesKickoffTimesRoutingModule,
    TeamsResolverModule,
    PropertiesResolverModule,
    TeamsDifferentKickoffTimesModule,
    NextUnlimitedTransfersModule
  ]
})
export class FixturesKickoffTimesModule {}
