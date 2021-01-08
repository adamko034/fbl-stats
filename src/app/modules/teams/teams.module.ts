import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsContentComponent } from './teams-content/teams-content.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './views/teams-list/teams-list.component';
import { TeamsSchedulesComponent } from './views/teams-schedules/teams-schedules.component';

@NgModule({
  declarations: [TeamsContentComponent, TeamsSchedulesComponent, TeamsListComponent],
  imports: [SharedModule, CoreModule, CommonModule, TeamsRoutingModule, AngularMaterialModule, FblCoreModule]
})
export class TeamsModule {}
