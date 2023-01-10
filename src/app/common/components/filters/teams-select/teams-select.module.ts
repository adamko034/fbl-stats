import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgPipesModule } from 'ngx-pipes';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { TeamLogoModule } from 'src/app/common/teams/team-logo/team-logo.module';
import { FormFieldModule } from '../../ui/form-field/form-field.module';
import { TeamsSelectDialogComponent } from './teams-select-dialog/teams-select-dialog.component';
import { TeamsSelectComponent } from './teams-select.component';
@NgModule({
  declarations: [TeamsSelectComponent, TeamsSelectDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    TeamLogoModule,
    NgPipesModule,
    MatFormFieldModule,
    MatIconModule,
    FormFieldModule,
    ScaleModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [TeamsSelectComponent]
})
export class TeamsSelectModule {}
