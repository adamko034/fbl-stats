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
          path: 'fantasy/players/overall',
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
        { order: 5, path: 'fantasy/our-picks', text: 'Our picks', icon: 'assistant' },
        { order: 6, path: 'fantasy/history/20-21', text: 'Last season', icon: 'history' }
      ]
    },
    {
      order: 2,
      text: 'Teams',
      children: [
        { order: 1, text: 'Predicted lineups', path: 'teams/lineups', icon: 'reduce_capacity' },
        { order: 2, path: 'teams/bundesliga/table', text: 'Bundesliga', icon: 'emoji_events' },
        { order: 3, path: 'teams/firstgames', text: 'First games', icon: 'repeat_one' },
        { order: 4, path: 'teams/fixturesdifficulty', text: 'Fixtures difficulty', icon: 'dynamic_form' }
      ]
    }
  ];
  // public static links: { [key: string]: NavigationLink } = {
  //   players: {
  //     order: 1,
  //     path: 'players',
  //     text: 'Players',
  //     children: [
  //       {
  //         order: 1,
  //         text: 'Players',
  //         children: [
  //           { order: 1, path: 'all', text: 'All players', icon: 'person_search' },
  //           { order: 2, path: 'myteam', text: 'My team', icon: 'groups' },
  //           { order: 3, path: 'lists/unavailable', text: 'Unavailable', icon: 'highlight_off' },
  //           { order: 4, path: 'lists/suspensionrisk', text: 'Suspension risk', icon: 'alarm_on' },
  //           { order: 5, path: 'lists/returning', text: 'Returning', icon: 'published_with_changes' }
  //         ]
  //       },
  //       {
  //         order: 2,
  //         text: 'Stats',
  //         children: [{ order: 1, path: 'lists/pointsEfficiency', text: 'Points efficiency', icon: 'insights' }]
  //       },
  //       {
  //         order: 3,
  //         text: 'Tips & Tricks',
  //         children: [
  //           { order: 3, path: 'leaders', text: 'Leaders', icon: 'leaderboard' },
  //           { order: 4, path: 'our-picks', text: 'Our picks', icon: 'assistant' }
  //         ]
  //       }
  //     ]
  //   },
  //   teams: {
  //     order: 2,
  //     path: 'teams',
  //     text: 'Teams',
  //     children: [
  //       {
  //         order: 1,
  //         text: 'teams',
  //         children: [{ order: 1, text: 'Predicted lineups', path: 'lineups', icon: 'reduce_capacity' }]
  //       },
  //       {
  //         order: 1,
  //         text: 'bundesliga',
  //         children: [
  //           { order: 1, path: 'bundesliga/table', text: 'Table', icon: 'emoji_events' },
  //           { order: 2, path: 'bundesliga/fixturesdifficulty', text: 'Fixtures difficulty', icon: 'dynamic_form' },
  //           { order: 3, path: 'bundesliga/firstgames', text: 'First games', icon: 'repeat_one' }
  //         ]
  //       }
  //     ]
  //   },
  //   aboutUs: {
  //     order: 3,
  //     path: 'about',
  //     text: 'About'
  //   }
  // };
}
