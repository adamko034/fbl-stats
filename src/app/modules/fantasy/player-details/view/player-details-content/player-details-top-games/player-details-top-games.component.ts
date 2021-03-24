import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameTextValueConverter } from 'src/app/modules/core/players/converters/game-text-value.converter';
import { PlayerGamesService } from 'src/app/modules/core/players/services/player-games.service';
import { PlayersDataService } from 'src/app/modules/core/players/services/players-data.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { PlayerDetailsGame } from '../../../models/player-details-game.model';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-top-games',
  templateUrl: './player-details-top-games.component.html',
  styleUrls: ['./player-details-top-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsTopGamesComponent {
  @Input() player: PlayerDetails;

  public get bestGames(): TextValue[] {
    return new ArrayStream<PlayerDetailsGame>(this.player.games)
      .filterQuick((g) => g.wasPlayed)
      .orderBy('points', 'dsc')
      .take(4)
      .convert(new GameTextValueConverter(this.playersDataservice))
      .collect();
  }

  public get worstGames(): TextValue[] {
    return new ArrayStream<PlayerDetailsGame>(this.player.games)
      .filterQuick((g) => g.wasPlayed)
      .orderBy('points', 'asc')
      .take(4)
      .convert(new GameTextValueConverter(this.playersDataservice))
      .collect();
  }

  public get probabilities(): TextValue[] {
    return [
      { text: '>= 5pts', value: this.getProbabilityValueText(5) },
      { text: '>= 10pts', value: this.getProbabilityValueText(10) },
      { text: '>= 15pts', value: this.getProbabilityValueText(15) },
      { text: '>= 20pts', value: this.getProbabilityValueText(20) }
    ];
  }

  public get probabilitiesLast5(): TextValue[] {
    return [
      { text: '>= 5pts', value: this.getProbabilityValueText(5, 5) },
      { text: '>= 10pts', value: this.getProbabilityValueText(10, 5) },
      { text: '>= 15pts', value: this.getProbabilityValueText(15, 5) },
      { text: '>= 20pts', value: this.getProbabilityValueText(20, 5) }
    ];
  }

  constructor(
    private playersDataservice: PlayersDataService,
    private playerGamesService: PlayerGamesService,
    private router: Router
  ) {}

  public onMoreScoringChancesClick(type: string): void {
    this.router.navigateByUrl(`/fantasy/lists/scoringChances/${type}`);
  }

  private getProbabilityValueText(minPoints: number, lastNGames?: number): string {
    let gamesPlayed: Game[] = this.player.games.filter((g) => g.wasPlayed);

    if (!!lastNGames) {
      gamesPlayed = this.playerGamesService.getLastNGames(gamesPlayed, lastNGames);
    }

    const games = this.playerGamesService.getGamesCountWithPointsGreaterThan(gamesPlayed, minPoints);
    const gamesCount = !!lastNGames ? lastNGames : this.player.games.filter((g) => g.wasPlayed).length;
    const percentage = Math.round((games.length / gamesCount) * 1000) / 10;

    return `${percentage}% (${games.length}/${gamesCount})`;
  }
}
