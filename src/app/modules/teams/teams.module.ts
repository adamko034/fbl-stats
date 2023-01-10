import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FblCoreModule } from 'src/app/modules/core/fbl-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsContentComponent } from './views/teams-content/teams-content.component';
@NgModule({
  declarations: [TeamsContentComponent],
  imports: [SharedModule, CommonModule, TeamsRoutingModule, AngularMaterialModule, FblCoreModule],
  providers: []
})
export class TeamsModule {}
