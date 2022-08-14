import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHorizontalTopScrollbar]'
})
export class HorizontalTopScrollbarDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  public ngAfterViewInit(): void {
    var scrollbar = document.createElement('div');
    const child = document.createElement('div');
    child.style.width = this.element.nativeElement.scrollWidth + 'px';
    child.style.paddingTop = '1px';
    child.appendChild(document.createTextNode('\xA0'));

    scrollbar.appendChild(child);
    scrollbar.style.overflow = 'auto';
    scrollbar.style.overflowY = 'hidden';
    scrollbar.style.width = '100%';

    scrollbar.onscroll = () => {
      this.element.nativeElement.scrollLeft = scrollbar.scrollLeft;
    };
    this.element.nativeElement.onscroll = () => {
      scrollbar.scrollLeft = this.element.nativeElement.scrollLeft;
    };

    this.element.nativeElement.parentNode.insertBefore(scrollbar, this.element.nativeElement);
  }
}
