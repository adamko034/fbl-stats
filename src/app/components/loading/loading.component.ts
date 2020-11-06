import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public dataLoaded$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.dataLoaded$ = this.loadingService.select();
  }
}
