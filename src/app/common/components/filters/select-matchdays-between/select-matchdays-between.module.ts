import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectMatchdaysBetweenComponent } from './components/select-matchdays-between.component';

@NgModule({
  declarations: [SelectMatchdaysBetweenComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  exports: [SelectMatchdaysBetweenComponent]
})
export class SelectMatchdaysBetweenModule {}
