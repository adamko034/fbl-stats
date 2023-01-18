import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { HomePlayersWatchoutPlayer } from './home-players-watchout-player.model';
import { HomePlayersWatchoutConverter } from './home-players-watchout.converter';

@Component({
  selector: 'app-home-players-watchout',
  templateUrl: './home-players-watchout.component.html',
  styleUrls: ['./home-players-watchout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlayersWatchoutComponent implements OnInit {
  @Input() players: Player[];

  public unavailables: HomePlayersWatchoutPlayer[];
  public returning: HomePlayersWatchoutPlayer[];
  public suspensionRisk: HomePlayersWatchoutPlayer[];
  public sales: HomePlayersWatchoutPlayer[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.unavailables = this.createHomePlayers((p) => p.attendance === 0);
    this.returning = this.createHomePlayers((p) => p.isReturning);
    this.suspensionRisk = this.createHomePlayers((p) => p.isSuspensionRisk);
    this.sales = this.createHomePlayers((p) => p.priceOriginal != 0 && p.price != p.priceOriginal);
  }

  public onShowMoreClick(type: string): void {
    this.router.navigate(['fantasy', 'players', 'lists', type]);
  }

  private createHomePlayers(filterFunc: (player: Player) => boolean): HomePlayersWatchoutPlayer[] {
    return new ArrayStream(this.players)
      .filterQuick(filterFunc)
      .convert(new HomePlayersWatchoutConverter())
      .orderByThenBy({ field: 'top500PopularityRounded', order: 'dsc' }, { field: 'last4', order: 'dsc' })
      .take(5)
      .collect();
  }
}
