import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { constants } from 'src/app/resources/resources';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-list-unavailable',
  templateUrl: './players-list-unavailable.component.html',
  styleUrls: ['./players-list-unavailable.component.scss']
})
export class PlayersListUnavailableComponent implements OnInit {
  public players$: Observable<Player[]>;
  public lastMatchday$: Observable<number>;

  public screens = ScreenSize;

  public get source(): string {
    return constants.links.ligainsider.unavailables;
  }

  constructor(private route: ActivatedRoute, private propertiesService: PropertiesStore) {}

  public ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
  }
}
