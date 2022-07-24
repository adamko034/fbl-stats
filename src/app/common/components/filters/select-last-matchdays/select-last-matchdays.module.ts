import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectLastMatchdaysComponent } from './components/select-last-matchdays.component';

@NgModule({
  declarations: [SelectLastMatchdaysComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  exports: [SelectLastMatchdaysComponent]
})
export class SelectLastMatchdaysModule {}
