import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DropdownContentComponent } from './components/dropdown-content/dropdown-content.component';
import { DropdownSectionComponent } from './components/dropdown-section/dropdown-section.component';
import { DropdownComponent } from './components/dropdown.component';

@NgModule({
  declarations: [DropdownComponent, DropdownContentComponent, DropdownSectionComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, OverlayModule, MatDividerModule],
  exports: [DropdownComponent, DropdownContentComponent, DropdownSectionComponent]
})
export class DropdownModule {}
