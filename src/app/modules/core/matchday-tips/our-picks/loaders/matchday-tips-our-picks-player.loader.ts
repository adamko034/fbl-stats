import { Injectable } from '@angular/core';
import { PlayerPredictionCombinedDeterminer } from 'src/app/common/players/services/player-prediction-combined-determiner.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayTipsOurPick } from 'src/app/store/matchday-tips/our-picks/models/matchday-tips-our-picks.model';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { MatchdayTipsOurPicksPlayerMatchday } from '../models/matchday-tips-our-picks-player-matchday.model';
import { MatchdayTipsOurPicksPlayer } from '../models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksTeamGame } from '../models/matchday-tips-our-picks-team-game.model';
import { MatchdayTipsOurPicksTeam } from '../models/matchday-tips-our-picks-team.model';

@Injectable({ providedIn: 'root' })
export class MatchdayTipsOurPicksPlayerLoader {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private predictionCombindedDeterminer: PlayerPredictionCombinedDeterminer
  ) {}

  public load(
    id: number,
    matchday: number,
    order?: number,
    currentPicks?: MatchdayTipsOurPick
  ): MatchdayTipsOurPicksPlayer {
    const player = this.playersStore.getById(id.toString());
    const team = this.teamsStore.getBy(player.teamShort);
    const matchdays = this.getPreviousMatchdays(player, matchday);
    let formPts = 0;
    matchdays.forEach((f) => (formPts += f.points));

    const ourPicksTeam: MatchdayTipsOurPicksTeam = {
      rank: team.rank,
      teamShort: team.shortName,
      nextGames: this.getNextGames(team, matchday)
    };

    return {
      name: player.name,
      playerId: id,
      order: order || null,
      team: ourPicksTeam,
      lastName: player.lastName,
      position: player.position,
      isBargain: currentPicks?.bargains?.includes(id) || false,
      isDifferential: currentPicks?.differentials?.includes(id) || false,
      isMustHave: currentPicks?.mustHave?.includes(id) || false,
      isPremium: currentPicks?.premium?.includes(id) || false,
      isSurprising: currentPicks?.suprising?.includes(id) || false,
      top100Popularity: player.top100Popularity,
      price: player.price,
      popularity: player.popularity,
      formPts,
      matchdays,
      prediction: this.predictionCombindedDeterminer.determine(player.nextGame),
      totalPoints: player.totalPoints,
      isAvailable: player.attendance === 1,
      nextGame: this.getNextGame(ourPicksTeam.nextGames)
    };
  }

  private getPreviousMatchdays(player: Player, lastMatchday: number): MatchdayTipsOurPicksPlayerMatchday[] {
    return player.games
      .filter((g) => lastMatchday - 3 < g.matchday && g.matchday <= lastMatchday)
      .map(({ matchday, points }) => ({ matchday, points }));
  }

  private getNextGames(team: Team, lastMatchday: number): MatchdayTipsOurPicksTeamGame[] {
    return team.games
      .filter((g) => lastMatchday < g.matchday && g.matchday <= lastMatchday + 3)
      .map((g) => ({
        isHome: g.isHome,
        matchday: g.matchday,
        opponentShort: g.opponent,
        opponentRank: g.opponentRank,
        isFirstGame: g.isMatchdayFirstGame
      }));
  }

  private getNextGame(games: MatchdayTipsOurPicksTeamGame[]): MatchdayTipsOurPicksTeamGame {
    return new ArrayStream(games).orderBy('matchday', 'asc').takeFirst();
  }
}
