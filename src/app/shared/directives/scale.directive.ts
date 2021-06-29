import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScale]'
})
export class ScaleDirective implements OnInit {
  @Input('appScale') scale: number;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    if (!this.scale) {
      return;
    }

    this.element.nativeElement.style.transform = `scale(${this.scale})`;
  }
}
