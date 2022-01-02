import { Injectable } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { MatchdayTipsTopTeamType } from '../models/matchday-tips-top-team-type.enum';
import { MatchdayTipsTopTeam } from '../models/matchday-tips-top-team.model';
import { MatchdayTipsTopTeamElector } from './matchday-tips-top-team-elector.service';
import { MatchdayTipsTopTeamExtractorFactory } from './matchday-tips-top-team-extractor-factory';

@Injectable()
export class MatchdayTipsTopTeamSelector {
  constructor(
    private elector: MatchdayTipsTopTeamElector,
    private playersExtractorFactory: MatchdayTipsTopTeamExtractorFactory
  ) {}

  public select(players: Player[], calculationType: MatchdayTipsTopTeamType): MatchdayTipsTopTeam {
    const extractor = this.playersExtractorFactory.create(calculationType);

    return this.elector.elect(extractor.extract(players));
  }
}
