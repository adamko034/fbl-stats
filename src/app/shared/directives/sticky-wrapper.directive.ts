import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[appStickyWrapper]' })
export class StickyWrapperDirective implements OnInit {
  //@Input('appSticky') sticky: { position: 'top' | 'left'; px: number };

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.overflow = 'auto';
    this.element.nativeElement.style['white-space'] = 'nowrap';
  }
}
