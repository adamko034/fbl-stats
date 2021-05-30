import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-players-list-returning',
  templateUrl: './players-list-returning.component.html',
  styleUrls: ['./players-list-returning.component.scss']
})
export class PlayersListReturningComponent implements OnInit {
  public players$: Observable<Player[]>;
  public lastMatchday$: Observable<number>;

  constructor(private route: ActivatedRoute, private propertiesService: PropertiesService) {}

  public ngOnInit(): void {
    this.lastMatchday$ = this.propertiesService.selectLastMatchday();
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
