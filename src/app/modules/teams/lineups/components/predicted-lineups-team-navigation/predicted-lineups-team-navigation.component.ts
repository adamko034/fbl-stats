import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamNavigation } from 'src/app/store/properties/properties.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-team-navigation',
  templateUrl: './predicted-lineups-team-navigation.component.html',
  styleUrls: ['./predicted-lineups-team-navigation.component.scss']
})
export class PredictedLineupsTeamNavigationComponent implements OnInit {
  private _isSummaryPage: boolean;
  public get isSummaryPage(): boolean {
    return this._isSummaryPage;
  }

  @Input() teams: TeamNavigation[];

  constructor(private _router: Router) {}

  public ngOnInit(): void {
    this._isSummaryPage = this._router.url.includes('/summary');
  }
}
