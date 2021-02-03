import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

export class Navigation {
  public static links: { [key: string]: NavigationLink } = {
    fantasy: {
      order: 1,
      path: '/fantasy',
      text: 'fantasy',
      key: 'fantasy',
      isDropdown: true,
      dropdownIndex: 1,
      dropdownLinks: [
        { order: 1, path: '/fantasy/players', text: 'players' },
        { order: 2, path: '/fantasy/myteam', text: 'my-team' },
        {
          order: 3,
          path: '/fantasy/lists',
          text: 'lists',
          key: 'lists',
          isDropdown: true,
          dropdownIndex: 2,
          dropdownLinks: [
            { order: 1, path: '/fantasy/lists/suspensionrisk', text: 'suspension risk' },
            { order: 2, path: '/fantasy/lists/unavailable', text: 'unavailable' },
            { order: 3, path: '/fantasy/lists/returning', text: 'returning' }
          ]
        }
      ]
    },
    bundesliga: {
      order: 3,
      path: '/bundesliga',
      text: 'bundesliga',
      key: 'bundesliga',
      isDropdown: true,
      dropdownIndex: 1,
      dropdownLinks: [
        { order: 1, path: '/bundesliga/table', text: 'table' },
        {
          order: 2,
          path: '/bundesliga/schedules',
          text: 'schedules',
          key: 'schedules',
          isDropdown: true,
          dropdownIndex: 2,
          dropdownLinks: [
            { order: 1, path: '/bundesliga/schedules/byRank', text: 'by table rank' },
            { order: 2, path: '/bundesliga/schedules/byForm', text: 'by team form' }
          ]
        },
        {
          order: 3,
          path: '/bundesliga/firstGames',
          text: 'matchdays first games'
        }
      ]
    },
    lineups: { order: 2, path: '/lineups', text: 'lineups', isDropdown: false },
    aboutUs: { order: 4, path: '/about', text: 'about', isDropdown: false }
  };
}
