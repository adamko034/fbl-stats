import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayersDisplaySettingsService } from 'src/app/modules/core/players/services/players-display-settings.service';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayersSearchComponent implements OnInit {
  @Input() key: string;

  public search = new FormControl();

  constructor(private displaySettingsService: PlayersDisplaySettingsService) {}

  public ngOnInit(): void {
    this.search.valueChanges.subscribe((value) => this.displaySettingsService.updateSearchTerm(this.key, value));
  }

  public clear(): void {
    this.search.reset();
  }
}
