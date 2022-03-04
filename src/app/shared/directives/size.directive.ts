import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appSize]' })
export class SizeDirective implements OnInit {
  @Input('appSize') size: { width: number; height: number };

  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    if (!this.size) {
      return;
    }

    this.elementRef.nativeElement.style.width = `${this.size.width}px`;
    this.elementRef.nativeElement.style.height = `${this.size.height}px`;
  }
}
