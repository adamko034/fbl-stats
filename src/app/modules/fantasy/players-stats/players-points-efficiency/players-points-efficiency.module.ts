import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersPointsEfficiencyRoutingModule } from './players-points-efficiency-routing.module';
import { PlayersPointsEfficiencyLoader } from './resolvers/players-points-efficiency.loader';
import { PlayersPointsEffciencyResolver } from './resolvers/players-points-efficiency.resolver';
import { PlayersPointsEfficiencyComponent } from './views/players-points-efficiency.component';

@NgModule({
  declarations: [PlayersPointsEfficiencyComponent],
  imports: [CommonModule, PlayersPointsEfficiencyRoutingModule, SharedModule, AngularMaterialModule],
  providers: [PlayersPointsEffciencyResolver, PlayersPointsEfficiencyLoader]
})
export class PlayersPointsEfficiencyModule {}