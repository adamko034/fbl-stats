import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ContentWhiteBlockModule } from '../content-white-block/content-white-block.module';
import { FollowUsComponent } from './follow-us.component';

@NgModule({
  declarations: [FollowUsComponent],
  imports: [CommonModule, FontAwesomeModule, ContentWhiteBlockModule],
  exports: [FollowUsComponent]
})
export class FollowUsModule {
  constructor(private faIconLibrary: FaIconLibrary) {
    this.faIconLibrary.addIcons(faTwitter);
  }
}
