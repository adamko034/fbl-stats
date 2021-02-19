import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurPicksRoutingModule } from './our-picks-routing.module';
import { OurPicksContentComponent } from './our-picks-content/our-picks-content.component';
import { OurPicksLatestGuard } from './guards/our-picks-latest.guard';
import { OurPicksMatchdayComponent } from './views/our-picks-matchday/our-picks-matchday.component';
import { OurPicksPlayersResolver } from './resolvers/our-picks-players.resolver';
import { OurPicksPlayersLoader } from './loaders/our-picks-players.loader';
import { OurPicksLoadedGuard } from './guards/our-picks-loaded.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { OurPicksPlayersComponent } from './components/our-picks-players/our-picks-players.component';
import { OurPicksPlayerComponent } from './components/our-picks-players/our-picks-player/our-picks-player.component';
import { OurPickIconComponent } from './components/our-pick-icon/our-pick-icon.component';
import { OurPicksMatchdayDescriptionComponent } from './views/our-picks-matchday/our-picks-matchday-description/our-picks-matchday-description.component';

@NgModule({
  declarations: [OurPicksContentComponent, OurPicksMatchdayComponent, OurPicksPlayersComponent, OurPicksPlayerComponent, OurPickIconComponent, OurPicksMatchdayDescriptionComponent],
  imports: [CommonModule, OurPicksRoutingModule, SharedModule, AngularMaterialModule],
  providers: [OurPicksLatestGuard, OurPicksPlayersResolver, OurPicksPlayersLoader, OurPicksLoadedGuard]
})
export class OurPicksModule {}
