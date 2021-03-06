import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { PlayerAttendancePredictionService } from '../../players/services/player-attendance-prediction.service';
import { OurPicksPlayerFantasyMatchday } from '../models/our-picks-player-fantasy-matchday.model';
import { OurPicksPlayerTeam } from '../models/our-picks-player-team.model';
import { OurPicksPlayer } from '../models/our-picks-player.model';
import { OurPicksTeamGame } from '../models/our-picks-team-game.model';

@Injectable({ providedIn: 'root' })
export class OurPicksPlayerLoader {
  constructor(
    private playersStore: PlayersStore,
    private teamsStore: TeamsStore,
    private predictionService: PlayerAttendancePredictionService
  ) {}

  public load(id: number, matchday: number, order?: number, currentPicks?: OurPicks): OurPicksPlayer {
    const player = this.playersStore.getById(id.toString());
    const team = this.teamsStore.getBy(player.teamShort);
    const matchdays = this.getPreviousMatchdays(player, matchday);
    let formPts = 0;
    matchdays.forEach((f) => (formPts += f.points));

    const ourPicksTeam: OurPicksPlayerTeam = {
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
      prediction: this.predictionService.determine(player.nextGame.lineupPredictions),
      totalPoints: player.totalPoints,
      nextGame: this.getNextGame(ourPicksTeam.nextGames)
    };
  }

  private getPreviousMatchdays(player: Player, lastMatchday: number): OurPicksPlayerFantasyMatchday[] {
    return player.games
      .filter((g) => lastMatchday - 3 < g.matchday && g.matchday <= lastMatchday)
      .map(({ matchday, points }) => ({ matchday, points }));
  }

  private getNextGames(team: Team, lastMatchday: number): OurPicksTeamGame[] {
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

  private getNextGame(games: OurPicksTeamGame[]): OurPicksTeamGame {
    return new ArrayStream(games).orderBy('matchday', 'asc').takeFirst();
  }
}
