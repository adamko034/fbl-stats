import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faEquals } from '@fortawesome/free-solid-svg-icons';
import { ValueDifferenceComponent } from './value-difference.component';

@NgModule({
  declarations: [ValueDifferenceComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ValueDifferenceComponent]
})
export class ValueDifferenceModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(faArrowUp, faArrowDown, faEquals);
  }
}
