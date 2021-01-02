import { Directive, ElementRef } from '@angular/core';

// tslint:disable-next-line: directive-selector
@Directive({ selector: 'img' })
export class ImageLazyLoadingDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}
