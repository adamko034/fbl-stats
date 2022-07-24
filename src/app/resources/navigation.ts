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
        { order: 6, path: 'fantasy/tips', text: 'Matchday tips', icon: 'batch_prediction' },
        { order: 7, path: 'fantasy/compare', text: 'Compare', icon: 'compare' }
      ]
    },
    {
      order: 2,
      text: 'Teams',
      children: [
        { order: 1, text: 'Predicted lineups', path: 'teams/lineups', icon: 'reduce_capacity' },
        { order: 2, path: 'teams/bundesliga', text: 'Bundesliga', icon: 'emoji_events' },
        { order: 4, path: 'teams/fixturesanalysis', text: 'Fixtures analysis', icon: 'dynamic_form' }
      ]
    },
    {
      order: 3,
      text: 'History',
      children: [
        { order: 1, path: 'fantasy/history/2021-2022', text: '2021-2022', icon: 'keyboard_arrow_left' },
        { order: 1, path: 'fantasy/history/2020-2021', text: '2020-2021', icon: 'keyboard_double_arrow_left' }
      ]
    },
    {
      order: 4,
      text: 'Other',
      children: [{ order: 2, path: 'fantasy/usefullinks', text: 'Useful links', icon: 'link' }]
    }
  ];
}
