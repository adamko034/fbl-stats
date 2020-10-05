import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PlayerPosition, PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { PlayersState } from 'src/app/layout/content/models/players-state.model';
import { Player } from 'src/app/models/player.model';
import { Properties } from 'src/app/models/properties.model';
import { PropertiesService } from 'src/app/services/properties.service';
import { StoreService } from 'src/app/services/store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  public properties$: Observable<Properties>;
  public state: PlayersState;
  public filters: PlayersFilters = { matchdays: 2, length: 15, price: 10, popularity: 10, team: 'VFB Stuttgart' };

  constructor(private storeService: StoreService, private propertiesService: PropertiesService) {}

  public ngOnInit() {
    Logger.logDev('content, on init, subscribing to store');
    this.properties$ = this.propertiesService.loadProperties();

    this.subscribeToDefenders();
    this.subscribeToForwards();
    this.subscribeToGoalkeepers();
    this.subscribeToMidfielders();
  }

  public ngOnDestroy() {
    Logger.logDev('content, on destroy, closing subscriptions');
    this.destroyed$.next();
    this.storeService.close();
  }

  public loadMidfielders() {
    this.filters = { ...this.filters, position: PlayerPosition.MID };
    this.storeService.loadMidfielders();
  }

  public loadForwards() {
    this.filters = { ...this.filters, position: PlayerPosition.FOR };
    this.storeService.loadForwards();
  }

  private subscribeToForwards() {
    this.storeService
      .selectForwards()
      .pipe(
        tap((players) => Logger.logDev('conent, forwards subscription, new value, count ' + players.length)),
        takeUntil(this.destroyed$)
      )
      .subscribe((forwards) => this.updateState(forwards, PlayerPosition.FOR));
  }

  private subscribeToMidfielders() {
    this.storeService
      .selectMidfielders()
      .pipe(
        tap((players) => Logger.logDev('conent, midfielders subscription, new value, count ' + players.length)),
        takeUntil(this.destroyed$)
      )
      .subscribe((midfielders) => this.updateState(midfielders, PlayerPosition.MID));
  }

  private subscribeToDefenders(): void {
    this.storeService
      .selectDefenders()
      .pipe(
        tap((players) => Logger.logDev('content, defenders subscription, new value, count ' + players.length)),
        takeUntil(this.destroyed$)
      )
      .subscribe((players: Player[]) => this.updateState(players, PlayerPosition.DEF));
  }

  private subscribeToGoalkeepers(): void {
    this.storeService
      .selectGoalkeepers()
      .pipe(
        tap((players) => Logger.logDev('content, goalkeepers subscription, new value, count ' + players.length)),
        takeUntil(this.destroyed$)
      )
      .subscribe((players: Player[]) => this.updateState(players, PlayerPosition.GK));
  }

  private updateState(players: Player[], position: PlayerPosition) {
    this.state = { ...this.state, [position]: players };
  }
}
