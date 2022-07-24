import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent } from './components/dropdown.component';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, OverlayModule],
  exports: [DropdownComponent]
})
export class DropdownModule {}
