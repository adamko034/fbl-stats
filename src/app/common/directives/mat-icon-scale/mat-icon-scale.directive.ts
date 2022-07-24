import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMatIconScale]'
})
export class MatIconScaleDirective {
  private _scale = 0.7;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.transform = `scale(${this._scale})`;
  }
}
