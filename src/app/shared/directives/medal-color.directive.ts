import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appMedalColor]' })
export class MedalColorDirective implements OnInit {
  @Input('appMedalColor') place: string;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.color = this.getColor();
  }

  private getColor(): string {
    const placeNumber = +this.place;

    if (isNaN(placeNumber)) {
      return;
    }

    if (placeNumber === 1) {
      return 'gold';
    }

    if (placeNumber === 2) {
      return 'silver';
    }

    return '#cc6633';
  }
}
