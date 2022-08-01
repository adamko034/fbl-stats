import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appSpanAsLink]'
})
export class SpanAsLinkDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    this.elementRef.nativeElement.style.cursor = 'pointer';
    this.elementRef.nativeElement.style.textDecoration = 'underline';
  }
}
