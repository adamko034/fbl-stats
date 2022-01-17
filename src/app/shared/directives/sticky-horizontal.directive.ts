import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[appStickyHorizontal]' })
export class StickyHorizontalDirective implements OnInit {
  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    console.log('on init ');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    console.log('on resize');
    console.log('element: ' + this.element.nativeElement.offsetWidth + ' window: ' + window.innerWidth);
    this.element.nativeElement.style.maxWidth = this.element.nativeElement.scrollWidth + 'px';
  }
}
