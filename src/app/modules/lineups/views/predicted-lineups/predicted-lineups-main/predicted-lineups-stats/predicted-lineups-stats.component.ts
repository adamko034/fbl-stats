import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { PredictedLineupsStatsPlayer } from 'src/app/modules/lineups/models/predicted-lineups-stats-player.model';
import { PredictedLineupsStatsPlayers } from 'src/app/modules/lineups/models/predicted-lineups-stats-players.model';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';

interface State {
  topBenched: TextValue[];
  topFormBenched: TextValue[];
  topPopularityBenched: TextValue[];
  top100PopularityBenched: TextValue[];

  topDoubts: TextValue[];
  topFormDoubts: TextValue[];
  topPopularityDoubts: TextValue[];
  top100PopularityDoubts: TextValue[];

  topUnavailable: TextValue[];
  topFormUnavailable: TextValue[];
  topPopularityUnavailable: TextValue[];
  top100PopularityUnavailable: TextValue[];
}

@Component({
  selector: 'app-predicted-lineups-stats',
  templateUrl: './predicted-lineups-stats.component.html',
  styleUrls: ['./predicted-lineups-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsStatsComponent implements OnInit {
  public state$: Observable<State>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(
      map((data) => data.stats),
      distinctUntilChanged(),
      map((stats: PredictedLineupsStatsPlayers) => {
        if (!stats) {
          return null;
        }

        return {
          topBenched: this.convertToTextValue(stats.topBenched, 'totalPoints', ' pts'),
          topFormBenched: this.convertToTextValue(stats.topFormBenched, 'last5Form', ' pts'),
          topPopularityBenched: this.convertToTextValue(stats.topPopularityBenched, 'popularity', '%'),
          top100PopularityBenched: this.convertToTextValue(stats.top100PopularityBenched, 'top100Popularity', '%'),

          topDoubts: this.convertToTextValue(stats.topDoubts, 'totalPoints', ' pts'),
          topFormDoubts: this.convertToTextValue(stats.topFormDoubts, 'last5Form', ' pts'),
          topPopularityDoubts: this.convertToTextValue(stats.topPopularityDoubts, 'popularity', '%'),
          top100PopularityDoubts: this.convertToTextValue(stats.top100PopularityDoubts, 'top100Popularity', '%'),

          topUnavailable: this.convertToTextValue(stats.topUnavailable, 'totalPoints', ' pts'),
          topFormUnavailable: this.convertToTextValue(stats.topFormUnavailable, 'last5Form', ' pts'),
          topPopularityUnavailable: this.convertToTextValue(stats.topPopularityUnavailable, 'popularity', '%'),
          top100PopularityUnavailable: this.convertToTextValue(
            stats.top100PopularityUnavailable,
            'top100Popularity',
            '%'
          )
        };
      })
    );
  }

  private convertToTextValue(players: PredictedLineupsStatsPlayer[], valueField: string, suffix: string): TextValue[] {
    if (!players) {
      return [];
    }

    return players.map((player) => ({
      text: player.lastName,
      teamShort: player.teamShort,
      value: `${player[valueField]}${suffix}`,
      linkId: player.playerId
    }));
  }
}
