import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { SelectFutureMatchdaysComponent } from './select-future-matchdays.component';

@NgModule({
  declarations: [SelectFutureMatchdaysComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, PipesModule],
  exports: [SelectFutureMatchdaysComponent]
})
export class SelectFutureMatchdaysModule {}
