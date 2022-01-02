import { Injectable } from '@angular/core';
import { MatchdayTipsTopTeamType } from '../models/matchday-tips-top-team-type.enum';
import { MatchdayTipsTopTeamExtractor } from './extractors/matchday-tips-top-team-extractor';
import { MatchdayTipsTopTeamExtractorAway } from './extractors/matchday-tips-top-team-extractor-away';
import { MatchdayTipsTopTeamExtractorFirstLeg } from './extractors/matchday-tips-top-team-extractor-first-leg';
import { MatchdayTipsTopTeamExtractorHome } from './extractors/matchday-tips-top-team-extractor-home';
import { MatchdayTipsTopTeamExtractorLast2 } from './extractors/matchday-tips-top-team-extractor-last2';
import { MatchdayTipsTopTeamExtractorLast4 } from './extractors/matchday-tips-top-team-extractor-last4';
import { MatchdayTipsTopTeamExtractorLast6 } from './extractors/matchday-tips-top-team-extractor-last6';
import { MatchdayTipsTopTeamExtractorOverall } from './extractors/matchday-tips-top-team-extractor-overall';
import { MatchdayTipsTopTeamExtractorSecondLeg } from './extractors/matchday-tips-top-team-extractor-second-leg';

@Injectable()
export class MatchdayTipsTopTeamExtractorFactory {
  public create(calculationType: MatchdayTipsTopTeamType): MatchdayTipsTopTeamExtractor {
    switch (calculationType) {
      case MatchdayTipsTopTeamType.LEG_FIST:
        return new MatchdayTipsTopTeamExtractorFirstLeg();
      case MatchdayTipsTopTeamType.LEG_SECOND:
        return new MatchdayTipsTopTeamExtractorSecondLeg();
      case MatchdayTipsTopTeamType.AWAY:
        return new MatchdayTipsTopTeamExtractorAway();
      case MatchdayTipsTopTeamType.HOME:
        return new MatchdayTipsTopTeamExtractorHome();
      case MatchdayTipsTopTeamType.LAST_2:
        return new MatchdayTipsTopTeamExtractorLast2();
      case MatchdayTipsTopTeamType.LAST_4:
        return new MatchdayTipsTopTeamExtractorLast4();
      case MatchdayTipsTopTeamType.LAST_6:
        return new MatchdayTipsTopTeamExtractorLast6();
      default:
        return new MatchdayTipsTopTeamExtractorOverall();
    }
  }
}
