import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  selector: 'app-players-list-returning',
  templateUrl: './players-list-returning.component.html',
  styleUrls: ['./players-list-returning.component.scss']
})
export class PlayersListReturningComponent implements OnInit {
  public players$: Observable<Player[]>;
  public lastMatchday$: Observable<number>;

  constructor(private route: ActivatedRoute, private propertiesService: PropertiesStore) {}

  public ngOnInit(): void {
    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
