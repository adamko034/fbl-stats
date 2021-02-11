import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-leaders-navigation',
  templateUrl: './leaders-navigation.component.html',
  styleUrls: ['./leaders-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersNavigationComponent implements OnInit {
  public matchdays$: Observable<number[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.matchdays$ = this.route.data.pipe(map((data) => data.matchdaysNumbers));
  }
}
