import { MyTeamKickOffTimesPlayer } from './my-team-kick-off-times-player';

export interface MyTeamKickOffTimes {
  date: number;
  gk: MyTeamKickOffTimesPlayer[];
  def: MyTeamKickOffTimesPlayer[];
  mid: MyTeamKickOffTimesPlayer[];
  for: MyTeamKickOffTimesPlayer[];
}
