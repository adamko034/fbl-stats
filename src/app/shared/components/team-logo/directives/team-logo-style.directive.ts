import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appTeamLogoStyle]' })
export class TeamLogoStyleDirective implements OnInit {
  @Input() height: number;
  @Input() scaleOnMobile = true;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    if (window.innerWidth < 600 && this.scaleOnMobile) {
      this.el.nativeElement.height = 30;
      this.el.nativeElement.width = 30;
      return;
    }

    if (!!this.height && this.height > 0) {
      this.el.nativeElement.height = this.height;
      this.el.nativeElement.width = this.height;
    }
  }
}
