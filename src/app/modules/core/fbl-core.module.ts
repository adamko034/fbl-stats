import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PlayersServicesModule } from 'src/app/common/players/services/players-services.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersTableAddOurPickComponent } from './players/components/players-table/players-table-add-our-pick/players-table-add-our-pick.component';
import { PlayersPickerComponent } from './players/picker/components/players-picker/players-picker.component';

@NgModule({
  declarations: [PlayersTableAddOurPickComponent, PlayersPickerComponent],
  imports: [CommonModule, SharedModule, AngularMaterialModule, RouterModule, PlayersServicesModule],
  exports: [PlayersPickerComponent]
})
export class FblCoreModule {}
