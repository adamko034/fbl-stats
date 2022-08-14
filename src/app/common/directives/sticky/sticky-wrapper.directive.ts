import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appStickyWrapper]' })
export class StickyWrapperDirective implements OnInit {
  @Input('appStickyWrapper') wrapper: { hideY: boolean } = { hideY: false };

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.overflow = 'auto';
    this.element.nativeElement.style['white-space'] = 'nowrap';

    if (this.wrapper.hideY) {
      this.element.nativeElement.style.overflowY = 'hidden';
    }
  }
}
