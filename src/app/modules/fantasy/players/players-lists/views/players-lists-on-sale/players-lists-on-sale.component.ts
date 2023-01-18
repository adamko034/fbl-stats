import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-players-lists-on-sale',
  templateUrl: './players-lists-on-sale.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersListsOnSaleComponent {
  public players$: Observable<Player[]>;

  public screens = ScreenSize;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
