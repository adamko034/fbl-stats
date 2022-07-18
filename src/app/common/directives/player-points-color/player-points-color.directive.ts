import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPlayerPointsColor]'
})
export class PlayerPointsColorDirective implements OnInit {
  @Input('appPlayerPointsColor') points?: number;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.classList.add(`points-${this.getPointsClass()}`);
  }

  private getPointsClass(): string {
    if (this.points === null) {
      return 'black';
    }

    if (this.points <= 0) {
      return 'darkred';
    }

    if (this.points > 0 && this.points <= 5) {
      return 'red';
    }

    if (this.points > 5 && this.points < 10) {
      return 'orange';
    }

    if (this.points >= 10 && this.points < 16) {
      return 'blue';
    }

    return 'green';
  }
}
