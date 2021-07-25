import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BundesligaTableRoutingModule } from './bundesliga-table-routing.module';
import { BundesligaTableTeamService } from './services/bundesliga-table-team.service';
import { BundesligaTableComponent } from './view/bundesliga-table/bundesliga-table.component';
import { BundesligaTeamsTableFiltersComponent } from './view/bundesliga-table/teams-table-filters/bundesliga-teams-table-filters.component';
import { BundesligaTeamsTableComponent } from './view/bundesliga-table/teams-table/bundesliga-teams-table.component';

@NgModule({
  declarations: [BundesligaTableComponent, BundesligaTeamsTableComponent, BundesligaTeamsTableFiltersComponent],
  imports: [CommonModule, BundesligaTableRoutingModule, SharedModule, AngularMaterialModule],
  providers: [BundesligaTableTeamService]
})
export class BundesligaTableModule {}
