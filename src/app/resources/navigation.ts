import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

export class Navigation {
  public static Links: NavigationLink[] = [
    {
      order: 1,
      text: 'Fantasy',
      children: [
        {
          order: 1,
          text: 'Players',
          path: 'fantasy/players',
          icon: 'person_search'
        },
        {
          order: 2,
          path: 'fantasy/myteam',
          text: 'My team',
          icon: 'groups'
        },
        { order: 3, path: 'fantasy/stats', text: 'Stats', icon: 'insights' },
        { order: 4, path: 'fantasy/leaders', text: 'Leaders', icon: 'leaderboard' },
        { order: 6, path: 'fantasy/tips', text: 'Matchday tips', icon: 'batch_prediction' }
      ]
    },
    {
      order: 2,
      text: 'Teams',
      children: [
        { order: 1, text: 'Predicted lineups', path: 'teams/lineups', icon: 'reduce_capacity' },
        { order: 2, path: 'teams/bundesliga', text: 'Bundesliga', icon: 'emoji_events' },
        { order: 3, path: 'teams/firstgames', text: 'First games', icon: 'repeat_one' },
        { order: 4, path: 'teams/fixturesdifficulty', text: 'Fixtures difficulty', icon: 'dynamic_form' }
      ]
    },
    {
      order: 3,
      text: 'Other',
      children: [
        { order: 1, path: 'fantasy/history/20-21', text: 'Last season', icon: 'history' },
        { order: 2, path: 'fantasy/usefullinks', text: 'Useful links', icon: 'link' }
      ]
    }
  ];
}
