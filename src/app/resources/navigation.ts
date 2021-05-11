import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

export class Navigation {
  public static links: { [key: string]: NavigationLink } = {
    players: {
      order: 1,
      path: 'players',
      text: 'players',
      children: [
        {
          order: 1,
          text: 'Players',
          children: [
            { order: 1, path: 'all', text: 'All players', icon: 'person_search' },
            { order: 2, path: 'myteam', text: 'My team', icon: 'groups' },
            { order: 3, path: 'lists/unavailable', text: 'Unavailable', icon: 'highlight_off' },
            { order: 4, path: 'lists/suspensionrisk', text: 'Suspension risk', icon: 'alarm_on' },
            { order: 5, path: 'lists/returning', text: 'Returning', icon: 'published_with_changes' }
          ]
        },
        {
          order: 2,
          text: 'Stats',
          children: [{ order: 1, path: 'lists/pointsEfficiency', text: 'Points efficiency', icon: 'insights' }]
        },
        {
          order: 3,
          text: 'Tips & Tricks',
          children: [
            { order: 3, path: 'leaders', text: 'Leaders', icon: 'leaderboard' },
            { order: 4, path: 'our-picks', text: 'Our picks', icon: 'assistant' }
          ]
        }
      ]
    },
    teams: {
      order: 2,
      path: 'fantasy/teams',
      text: 'teams'
    },
    bundesliga: {
      order: 3,
      path: 'bundesliga',
      text: 'bundesliga'
    },
    aboutUs: {
      order: 4,
      path: 'about',
      text: 'about'
    }
  };

  // public static links: { [key: string]: NavigationLink } = {
  //   fantasy: {
  //     order: 1,
  //     path: '/fantasy',
  //     text: 'fantasy',
  //     key: 'fantasy',
  //     isDropdown: true,
  //     dropdownIndex: 1,
  //     dropdownLinks: [
  //       { order: 1, path: '/fantasy/players', text: 'players' },
  //       { order: 2, path: '/fantasy/myteam', text: 'my-team' },
  //       {
  //         order: 3,
  //         path: '/fantasy/lists',
  //         text: 'lists',
  //         key: 'lists',
  //         isDropdown: true,
  //         dropdownIndex: 2,
  //         dropdownLinks: [
  //           { order: 1, path: '/fantasy/lists/suspensionrisk', text: 'suspension risk' },
  //           { order: 2, path: '/fantasy/lists/unavailable', text: 'unavailable' },
  //           { order: 3, path: '/fantasy/lists/returning', text: 'returning' },
  //           { order: 4, path: '/fantasy/lists/pointsEfficiency', text: 'points effciency' }
  //         ]
  //       },
  //       {
  //         order: 4,
  //         path: '/fantasy/leaders',
  //         text: 'leaders'
  //       },
  //       {
  //         order: 5,
  //         path: '/fantasy/our-picks',
  //         text: 'our-picks'
  //       }
  //     ]
  //   },
  //   bundesliga: {
  //     order: 3,
  //     path: '/bundesliga',
  //     text: 'bundesliga',
  //     key: 'bundesliga',
  //     isDropdown: true,
  //     dropdownIndex: 1,
  //     dropdownLinks: [
  //       { order: 1, path: '/bundesliga/table', text: 'table' },
  //       {
  //         order: 2,
  //         path: '/bundesliga/nextFixtures',
  //         text: 'next fixtures',
  //         key: 'nextFixtures',
  //         isDropdown: true,
  //         dropdownIndex: 2,
  //         dropdownLinks: [
  //           { order: 1, path: '/bundesliga/nextFixtures/byRank', text: 'by table rank' },
  //           { order: 2, path: '/bundesliga/nextFixtures/byForm', text: 'by team form' }
  //         ]
  //       },
  //       {
  //         order: 3,
  //         path: '/bundesliga/firstGames',
  //         text: 'matchdays',
  //         key: 'matchdays',
  //         isDropdown: true,
  //         dropdownIndex: 2,
  //         dropdownLinks: [{ order: 1, path: '/bundesliga/matchdays/firstGames', text: 'first games' }]
  //       }
  //     ]
  //   },
  //   lineups: { order: 2, path: '/lineups', text: 'lineups', isDropdown: false },
  //   aboutUs: { order: 4, path: '/about', text: 'about', isDropdown: false }
  // };
}
