import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { PlayersViewService } from 'src/app/modules/core/players/services/players-view.service';

@Component({
  selector: 'app-players-view-switch',
  templateUrl: './players-view-switch.component.html',
  styleUrls: ['./players-view-switch.component.scss']
})
export class PlayersViewSwitchComponent implements OnInit {
  public value$: Observable<PlayersView>;

  constructor(private playersViewService: PlayersViewService) {}

  public ngOnInit(): void {
    this.value$ = this.playersViewService.select();
  }

  public onViewChange(newView: PlayersView): void {
    this.playersViewService.change(newView);
  }
}
