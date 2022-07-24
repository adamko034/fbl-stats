import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SwitcherComponent } from './components/switcher.component';

@NgModule({
  declarations: [SwitcherComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  exports: [SwitcherComponent]
})
export class SwitcherModule {}
