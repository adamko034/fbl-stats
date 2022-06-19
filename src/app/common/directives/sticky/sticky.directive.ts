import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appSticky]' })
export class StickyDirective implements OnInit {
  @Input('appSticky') sticky: { position: 'top' | 'left'; px?: number; backgroundColor?: string };

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    const pixels = this.sticky.px ?? 0;
    this.element.nativeElement.style[this.sticky.position] = `${pixels}px`;
    this.element.nativeElement.style.position = 'sticky';
    this.element.nativeElement.style['z-index'] = 100;

    const background = this.sticky.backgroundColor ?? '#fff';
    this.element.nativeElement.style['background-color'] = background;
  }
}
