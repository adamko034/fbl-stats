import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPiggyBank, faStar } from '@fortawesome/free-solid-svg-icons';
import { OurPickIconComponent } from './our-pick-icon.component';

@NgModule({
  declarations: [OurPickIconComponent],
  imports: [CommonModule, FontAwesomeModule, MatTooltipModule],
  exports: [OurPickIconComponent]
})
export class OurPickIconModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(faPiggyBank, faStar);
  }
}
