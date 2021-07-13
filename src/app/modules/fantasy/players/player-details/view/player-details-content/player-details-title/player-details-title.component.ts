import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-title',
  templateUrl: './player-details-title.component.html',
  styleUrls: ['./player-details-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsTitleComponent implements OnInit {
  @Input() player: PlayerDetails;
  public showSubrow = true;

  @HostListener('window:scroll', ['$event'])
  private setIfShowSubrow(event) {
    this.showSubrow = window.pageYOffset <= 10;
  }

  constructor(private location: Location) {}

  ngOnInit(): void {}

  public onGoBackClick(): void {
    this.location.back();
  }
}
