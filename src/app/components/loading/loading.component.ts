import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public dataLoaded$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.dataLoaded$ = this.loadingService
      .select()
      .pipe(tap((val) => Logger.logDev('Loading Component: data loaded: ' + val)));
  }
}
